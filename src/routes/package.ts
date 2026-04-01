// routes/package.ts
import express from 'express';
import { fetchPackageList, getAllTasks } from '../services/fetchPackage';
import { PackageItem } from '../types/PackageItem';
import { AppConfig, MonthNames } from '../constants/Constants';
import { getIncomeSummary } from '../util/GoogleSheet';
import { sendLineNotify } from '../util/LineNotify';

const router = express.Router();

router.get('/packages', async (req, res) => {
  try {
    const results: PackageItem[] = [];
    var allTasks = await getAllTasks('uneedcargo');
    for (const job of allTasks) {
      const res = await fetchPackageList(job, false);
      if (res && Array.isArray(res)) {
        results.push(...res);
      }
    }

    res.json({
      success: true,
      version: AppConfig.VERSION,
      count: results?.length || 0,
      data: results,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

router.get('/summary', async (req, res) => {
  try {
    const data = await getIncomeSummary('รายได้!A3:K');
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    var result: any = data.find((item) => item.year === year && item.month.trim() === MonthNames[month - 1]);
    console.log('result', result);

    let msg = `
🎉 สรุปยอดขาย ${result?.month.trim()} ${year} 🏦
--------------------------
💰Shopee : ${result?.shopee || '-'}
💰Lazada : ${result?.lazada || '-'}
💰Tiktok : ${result?.tiktok || '-'}
💰Nocnoc : ${result?.nocnoc || '-'}
💰Shopee2 : ${result?.shopee2 || '-'}
💰Lazada2 : ${result?.lazada2 || '-'}
💰นอกระบบ: ${result?.other ?? '-'}
--------------------------
✅ รวมยอดขายทั้งหมด: ${result?.summary}
🏝เติบโตจากเดือนที่แล้ว: ${result?.grow} 🎁
`;

    console.log(msg);
    await sendLineNotify(msg);

    res.json({
      success: true,
      version: AppConfig.VERSION,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

export default router;
