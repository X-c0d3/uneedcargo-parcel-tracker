import _ from 'lodash';
import 'dotenv/config';
import axios from 'axios';
import { Op } from 'sequelize';
import { JSDOM } from 'jsdom';
import { PackageItem, columnMapping } from '../types/PackageItem';
import { toSafeNumber } from '../util/Helper';
import Db from '../db/config';
import { productImports } from '../db/models/productImports';
import { jobs } from '../db/models/jobs';

const DEFAULT_PAGE = process.env.DEFAULT_PAGE || 1;

export const fetchPackageList = async (job: jobs, hasTriedLogin: boolean = false): Promise<PackageItem[] | null> => {
  const { jobId, shopId } = job;

  if (!job.actived) {
    return null;
  }

  try {
    var results = await getUneedCargoPackageList(job);
    //get all productImportings
    const productImportings = await getProductImportings(shopId);

    if (results.length > 0) {
      var importedItems = results.map((item) => {
        let productInfo: any = productImportings.find((v: any) => v.trackingNo === item.parcelNumber);
        let productName = productInfo ? productInfo.product.productName : '';
        let orderNo = productInfo ? productInfo.orderNo : '';
        let statusName = productInfo ? productInfo.status?.statusName : '';
        let totalPrice = (item.countedQuantity ?? 0) + (item.boxCount ?? 0) + (item.others ?? 0) + (item.pricePerKg ?? 0) + (item.pricePerCbm ?? 0);
        return { orderNo, productName, statusName, ...item, totalPrice };
      });

      const allparcelNumber = importedItems.map((pkg: any) => pkg.parcelNumber);
      const existingtrackingNoDB = productImportings.map((v: any) => v.trackingNo ?? '').filter(Boolean);
      const parcelNotInDB = importedItems.filter((pkg: PackageItem) => pkg.paymentStatus === '-' && !existingtrackingNoDB.includes(pkg.parcelNumber));

      console.log(
        'รายการนำเข้าแต่ไม่มีในระบบ:',
        parcelNotInDB.map((v: any) => ` - parcelNumber: ${v.parcelNumber} | lot: ${v.lot} | productType: ${v.productType} | warehouseEntryDate: ${v.warehouseEntryDate} totalPrice: ${v.totalPrice}THB`),
      );

      var itemNotIn = productImportings.filter((v: any) => !allparcelNumber.includes(v.trackingNo ?? ''));
      console.log(
        'รายการที่ยังไม่ได้เข้าระบบ:',
        itemNotIn.map((v: any) => ` - importeId: ${v.importeId}, orderNo: ${v.orderNo}, parcelNumber: ${v.trackingNo} (${v.status?.statusName}) | ${v.product.productName} `),
      );

      var itemIn = productImportings.filter((v: any) => allparcelNumber.includes(v.trackingNo ?? ''));
      console.log(
        'รายการที่เข้าระบบแล้ว:',
        itemIn.map((v: any) => ` - importeId: ${v.importeId}, orderNo: ${v.orderNo}, parcelNumber: ${v.trackingNo} (${v.status?.statusName}) | ${v.product.productName} | # ${v.shippingCost}THB`),
      );

      productImportings
        .filter((v: any) => allparcelNumber.includes(v.trackingNo ?? ''))
        ?.forEach(async (item: productImports, index: number) => {
          const matchedPackage = importedItems.find((pkg) => pkg.parcelNumber === item.trackingNo);

          // 3	สั่งชื้อแล้ว
          // 4	อยู่ระหว่างนำเข้า
          // 5	ถึงไทยแล้ว
          // 6	ระหว่างนำส่งในไทย

          const { importeId, statusTypeId, shippingCost } = item;
          const { parcelNumber, arrivalDate, totalPrice, paymentStatus } = matchedPackage || {};
          if (matchedPackage) {
            // สั่งชื้อแล้ว --> อยู่ระหว่างนำเข้า
            if (statusTypeId === 3 && (totalPrice ?? 0) > 0) {
              console.log(`importeId: ${importeId} / ${parcelNumber} | statusTypeId: ${statusTypeId} | สั่งชื้อแล้ว --> อยู่ระหว่างนำเข้า`);
              await Db.productImports.update({ statusTypeId: 4, shippingCost: totalPrice, modifiedDatetime: new Date() }, { where: { importeId: importeId } });
            }

            // อยู่ระหว่างนำเข้า --> ถึงไทยแล้ว
            if (statusTypeId === 4 && arrivalDate !== '-' && (shippingCost ?? 0) > 0) {
              console.log(`importeId: ${importeId} / ${parcelNumber} | statusTypeId: ${statusTypeId} | อยู่ระหว่างนำเข้า --> ถึงไทยแล้ว | arrivalDate: ${arrivalDate}`);
              await Db.productImports.update({ statusTypeId: 5, modifiedDatetime: new Date() }, { where: { importeId: importeId, isDeleted: 0 } });
            }

            // ถึงไทยแล้ว --> ระหว่างนำส่งในไทย
            if (statusTypeId === 5 && arrivalDate !== '-' && paymentStatus !== '-' && (shippingCost ?? 0) > 0) {
              console.log(`importeId: ${importeId} / ${parcelNumber} | statusTypeId: ${statusTypeId} | ถึงไทยแล้ว --> ระหว่างนำส่งในไทย`);
              await Db.productImports.update({ statusTypeId: 6, modifiedDatetime: new Date() }, { where: { importeId: importeId, isDeleted: 0 } });
            }
          }
        });

      //console.log(importedItems);
      //console.table(importedItems);

      await Db.jobs.update({ lastRun: new Date() }, { where: { jobId: jobId, shopId: shopId as number } });

      return importedItems;
    } else {
      console.log('ไม่พบรายการที่ยังไม่ชำระเงิน');
      if (!hasTriedLogin) {
        await login(job);
        let activeJob = await getTask(job.jobId);
        if (activeJob) await fetchPackageList(activeJob, true);
      }
    }
  } catch (err: any) {
    console.error(err.message);
    if (err.response) {
      console.error('Response Error:', err.response.data?.substring?.(0, 500) || err.response.data);
    }
  }
  return null;
};

const getUneedCargoPackageList = async (job: jobs): Promise<PackageItem[]> => {
  const { api_url, cookie } = job;
  const results: PackageItem[] = [];

  if (!job.actived) {
    return [];
  }

  console.log(`Fetching data from ${api_url} (page ${DEFAULT_PAGE})`);
  console.log(`PHPSESSID : ${cookie}`);

  var response = await axios.post(`${api_url}/application/package/list`, 'page=' + DEFAULT_PAGE + '&search=&type=&status=', {
    headers: { 'x-requested-with': 'XMLHttpRequest', Cookie: cookie },
  });
  const html = response.data;
  const dom = new JSDOM(html);
  const document = dom.window.document;

  const headerCells = document.querySelectorAll('thead tr th.hidden-xs.hidden-sm');
  const headers = Array.from(headerCells).map((th) => th.textContent?.trim() || '');
  const rows = document.querySelectorAll('tbody tr');

  rows.forEach((row) => {
    const cells = row.querySelectorAll('td.hidden-xs.hidden-sm');
    if (cells.length === 0) return;

    const rowData: Partial<PackageItem> = {};
    cells.forEach((cell, index) => {
      const thaiHeader = headers[index] || '';
      const englishKey = columnMapping[thaiHeader];

      if (!englishKey) return;

      let value = cell.textContent?.trim() || '';

      if (englishKey === 'parcelNumber') {
        const link = cell.querySelector('a');
        if (link) value = link.textContent?.trim() || value;
      }

      const currencySpan = cell.querySelector('span.currency');
      if (currencySpan) {
        value = currencySpan.textContent?.trim() || '';
      }

      value = value.replace(/\s+/g, ' ').trim();

      if (englishKey === 'weightKg' || englishKey === 'countedQuantity' || englishKey === 'volumeCbm' || englishKey === 'boxCount' || englishKey === 'others' || englishKey === 'pricePerKg' || englishKey === 'pricePerCbm') {
        rowData[englishKey] = toSafeNumber(value);
      } else {
        rowData[englishKey] = value;
      }
    });

    results.push(rowData as PackageItem);
  });
  return results;
};

const login = async (job: jobs) => {
  const { jobId, shopId, api_url, username, password } = job;

  console.log('---->> Login <<----');
  var HEADERS = {
    headers: {
      'x-requested-with': 'XMLHttpRequest',
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
  };
  var response = await axios.post(`${api_url}/signingo`, `username=${username}&password=${password}`, HEADERS);
  console.log('Login response ', response.data);
  const setCookieHeader = response.headers['set-cookie'];
  console.log('raw PHPSESSID ', setCookieHeader);
  if (!setCookieHeader || setCookieHeader.length === 0) {
    console.error('Not found Set-Cookie in response header');
    return null;
  }

  let phpSessId = null;
  for (const cookieStr of setCookieHeader) {
    if (cookieStr.includes('PHPSESSID=')) {
      phpSessId = cookieStr.split(';')[0].trim();
      break;
    }
  }

  if (!phpSessId) {
    console.error('ไม่พบ PHPSESSID ใน Set-Cookie');
    return null;
  }

  await Db.jobs.update({ cookie: phpSessId, modifiedDatetime: new Date() }, { where: { jobId: jobId, shopId: shopId as number } });
};

export const getTask = async (jobId: number): Promise<jobs | null> => await Db.jobs.findOne({ where: { jobId: jobId, actived: 1 } });

export const getAllTasks = async (jobName: string): Promise<jobs[]> => await Db.jobs.findAll({ where: { name: jobName, actived: 1 } });

export const getProductImportings = async (shopId: number): Promise<productImports[]> => {
  const productImportings = await Db.productImports.findAll({
    where: {
      shopId: shopId,
      statusTypeId: { [Op.in]: [3, 4, 5] },
      trackingNo: { [Op.ne]: '' },
      isDeleted: 0,
    },
    include: [
      { model: Db.products, as: 'product', required: false, where: { isDeleted: 0 } },
      { model: Db.statusType, as: 'status', required: false },
    ],
    order: [['createdDatetime', 'desc']],
  });

  return productImportings;
};
