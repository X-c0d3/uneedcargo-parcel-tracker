import type { Sequelize } from "sequelize";
import { bankAccount as _bankAccount } from "./bankAccount";
import type { bankAccountAttributes, bankAccountCreationAttributes } from "./bankAccount";
import { buyedTaxReports as _buyedTaxReports } from "./buyedTaxReports";
import type { buyedTaxReportsAttributes, buyedTaxReportsCreationAttributes } from "./buyedTaxReports";
import { documentType as _documentType } from "./documentType";
import type { documentTypeAttributes, documentTypeCreationAttributes } from "./documentType";
import { invoiceProducts as _invoiceProducts } from "./invoiceProducts";
import type { invoiceProductsAttributes, invoiceProductsCreationAttributes } from "./invoiceProducts";
import { invoiceRunning as _invoiceRunning } from "./invoiceRunning";
import type { invoiceRunningAttributes, invoiceRunningCreationAttributes } from "./invoiceRunning";
import { invoices as _invoices } from "./invoices";
import type { invoicesAttributes, invoicesCreationAttributes } from "./invoices";
import { jobs as _jobs } from "./jobs";
import type { jobsAttributes, jobsCreationAttributes } from "./jobs";
import { paymentStatus as _paymentStatus } from "./paymentStatus";
import type { paymentStatusAttributes, paymentStatusCreationAttributes } from "./paymentStatus";
import { paymentTransactions as _paymentTransactions } from "./paymentTransactions";
import type { paymentTransactionsAttributes, paymentTransactionsCreationAttributes } from "./paymentTransactions";
import { platform as _platform } from "./platform";
import type { platformAttributes, platformCreationAttributes } from "./platform";
import { productGroup as _productGroup } from "./productGroup";
import type { productGroupAttributes, productGroupCreationAttributes } from "./productGroup";
import { productImages as _productImages } from "./productImages";
import type { productImagesAttributes, productImagesCreationAttributes } from "./productImages";
import { productImports as _productImports } from "./productImports";
import type { productImportsAttributes, productImportsCreationAttributes } from "./productImports";
import { productStatus as _productStatus } from "./productStatus";
import type { productStatusAttributes, productStatusCreationAttributes } from "./productStatus";
import { products as _products } from "./products";
import type { productsAttributes, productsCreationAttributes } from "./products";
import { settings as _settings } from "./settings";
import type { settingsAttributes, settingsCreationAttributes } from "./settings";
import { shop as _shop } from "./shop";
import type { shopAttributes, shopCreationAttributes } from "./shop";
import { sourceType as _sourceType } from "./sourceType";
import type { sourceTypeAttributes, sourceTypeCreationAttributes } from "./sourceType";
import { statusType as _statusType } from "./statusType";
import type { statusTypeAttributes, statusTypeCreationAttributes } from "./statusType";
import { transportType as _transportType } from "./transportType";
import type { transportTypeAttributes, transportTypeCreationAttributes } from "./transportType";
import { userProfiles as _userProfiles } from "./userProfiles";
import type { userProfilesAttributes, userProfilesCreationAttributes } from "./userProfiles";
import { userRole as _userRole } from "./userRole";
import type { userRoleAttributes, userRoleCreationAttributes } from "./userRole";

export {
  _bankAccount as bankAccount,
  _buyedTaxReports as buyedTaxReports,
  _documentType as documentType,
  _invoiceProducts as invoiceProducts,
  _invoiceRunning as invoiceRunning,
  _invoices as invoices,
  _jobs as jobs,
  _paymentStatus as paymentStatus,
  _paymentTransactions as paymentTransactions,
  _platform as platform,
  _productGroup as productGroup,
  _productImages as productImages,
  _productImports as productImports,
  _productStatus as productStatus,
  _products as products,
  _settings as settings,
  _shop as shop,
  _sourceType as sourceType,
  _statusType as statusType,
  _transportType as transportType,
  _userProfiles as userProfiles,
  _userRole as userRole,
};

export type {
  bankAccountAttributes,
  bankAccountCreationAttributes,
  buyedTaxReportsAttributes,
  buyedTaxReportsCreationAttributes,
  documentTypeAttributes,
  documentTypeCreationAttributes,
  invoiceProductsAttributes,
  invoiceProductsCreationAttributes,
  invoiceRunningAttributes,
  invoiceRunningCreationAttributes,
  invoicesAttributes,
  invoicesCreationAttributes,
  jobsAttributes,
  jobsCreationAttributes,
  paymentStatusAttributes,
  paymentStatusCreationAttributes,
  paymentTransactionsAttributes,
  paymentTransactionsCreationAttributes,
  platformAttributes,
  platformCreationAttributes,
  productGroupAttributes,
  productGroupCreationAttributes,
  productImagesAttributes,
  productImagesCreationAttributes,
  productImportsAttributes,
  productImportsCreationAttributes,
  productStatusAttributes,
  productStatusCreationAttributes,
  productsAttributes,
  productsCreationAttributes,
  settingsAttributes,
  settingsCreationAttributes,
  shopAttributes,
  shopCreationAttributes,
  sourceTypeAttributes,
  sourceTypeCreationAttributes,
  statusTypeAttributes,
  statusTypeCreationAttributes,
  transportTypeAttributes,
  transportTypeCreationAttributes,
  userProfilesAttributes,
  userProfilesCreationAttributes,
  userRoleAttributes,
  userRoleCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const bankAccount = _bankAccount.initModel(sequelize);
  const buyedTaxReports = _buyedTaxReports.initModel(sequelize);
  const documentType = _documentType.initModel(sequelize);
  const invoiceProducts = _invoiceProducts.initModel(sequelize);
  const invoiceRunning = _invoiceRunning.initModel(sequelize);
  const invoices = _invoices.initModel(sequelize);
  const jobs = _jobs.initModel(sequelize);
  const paymentStatus = _paymentStatus.initModel(sequelize);
  const paymentTransactions = _paymentTransactions.initModel(sequelize);
  const platform = _platform.initModel(sequelize);
  const productGroup = _productGroup.initModel(sequelize);
  const productImages = _productImages.initModel(sequelize);
  const productImports = _productImports.initModel(sequelize);
  const productStatus = _productStatus.initModel(sequelize);
  const products = _products.initModel(sequelize);
  const settings = _settings.initModel(sequelize);
  const shop = _shop.initModel(sequelize);
  const sourceType = _sourceType.initModel(sequelize);
  const statusType = _statusType.initModel(sequelize);
  const transportType = _transportType.initModel(sequelize);
  const userProfiles = _userProfiles.initModel(sequelize);
  const userRole = _userRole.initModel(sequelize);

  paymentTransactions.belongsTo(bankAccount, { as: "bankAccount", foreignKey: "bankAccountId"});
  bankAccount.hasMany(paymentTransactions, { as: "paymentTransactions", foreignKey: "bankAccountId"});
  invoiceRunning.belongsTo(documentType, { as: "documentType_documentType", foreignKey: "documentType"});
  documentType.hasMany(invoiceRunning, { as: "invoiceRunnings", foreignKey: "documentType"});
  invoices.belongsTo(documentType, { as: "documentType_documentType", foreignKey: "documentType"});
  documentType.hasMany(invoices, { as: "invoices", foreignKey: "documentType"});
  invoiceProducts.belongsTo(invoices, { as: "invoice", foreignKey: "invoiceId"});
  invoices.hasMany(invoiceProducts, { as: "invoiceProducts", foreignKey: "invoiceId"});
  paymentTransactions.belongsTo(paymentStatus, { as: "paymentStatus", foreignKey: "paymentStatusId"});
  paymentStatus.hasMany(paymentTransactions, { as: "paymentTransactions", foreignKey: "paymentStatusId"});
  invoices.belongsTo(platform, { as: "platform", foreignKey: "platformId"});
  platform.hasMany(invoices, { as: "invoices", foreignKey: "platformId"});
  products.belongsTo(productGroup, { as: "group", foreignKey: "groupId"});
  productGroup.hasMany(products, { as: "products", foreignKey: "groupId"});
  products.belongsTo(productStatus, { as: "productStatus", foreignKey: "productStatusId"});
  productStatus.hasMany(products, { as: "products", foreignKey: "productStatusId"});
  productImages.belongsTo(products, { as: "product", foreignKey: "productId"});
  products.hasMany(productImages, { as: "productImages", foreignKey: "productId"});
  productImports.belongsTo(products, { as: "product", foreignKey: "productId"});
  products.hasMany(productImports, { as: "productImports", foreignKey: "productId"});
  userProfiles.belongsTo(shop, { as: "shop", foreignKey: "shopId"});
  shop.hasMany(userProfiles, { as: "userProfiles", foreignKey: "shopId"});
  paymentTransactions.belongsTo(sourceType, { as: "sourceType", foreignKey: "sourceTypeId"});
  sourceType.hasMany(paymentTransactions, { as: "paymentTransactions", foreignKey: "sourceTypeId"});
  productImports.belongsTo(statusType, { as: "statusType", foreignKey: "statusTypeId"});
  statusType.hasMany(productImports, { as: "productImports", foreignKey: "statusTypeId"});
  productImports.belongsTo(transportType, { as: "transportType", foreignKey: "transportTypeId"});
  transportType.hasMany(productImports, { as: "productImports", foreignKey: "transportTypeId"});
  bankAccount.belongsTo(userProfiles, { as: "modifiedUser", foreignKey: "modifiedUserId"});
  userProfiles.hasMany(bankAccount, { as: "bankAccounts", foreignKey: "modifiedUserId"});
  buyedTaxReports.belongsTo(userProfiles, { as: "modifiedUser", foreignKey: "modifiedUserId"});
  userProfiles.hasMany(buyedTaxReports, { as: "buyedTaxReports", foreignKey: "modifiedUserId"});
  invoices.belongsTo(userProfiles, { as: "modifiedUser", foreignKey: "modifiedUserId"});
  userProfiles.hasMany(invoices, { as: "invoices", foreignKey: "modifiedUserId"});
  paymentStatus.belongsTo(userProfiles, { as: "modifiedUser", foreignKey: "modifiedUserId"});
  userProfiles.hasMany(paymentStatus, { as: "paymentStatuses", foreignKey: "modifiedUserId"});
  paymentTransactions.belongsTo(userProfiles, { as: "modifiedUser", foreignKey: "modifiedUserId"});
  userProfiles.hasMany(paymentTransactions, { as: "paymentTransactions", foreignKey: "modifiedUserId"});
  productGroup.belongsTo(userProfiles, { as: "modifiedUser", foreignKey: "modifiedUserId"});
  userProfiles.hasMany(productGroup, { as: "productGroups", foreignKey: "modifiedUserId"});
  productImports.belongsTo(userProfiles, { as: "modifiedUser", foreignKey: "modifiedUserId"});
  userProfiles.hasMany(productImports, { as: "productImports", foreignKey: "modifiedUserId"});
  products.belongsTo(userProfiles, { as: "modifiedUser", foreignKey: "modifiedUserId"});
  userProfiles.hasMany(products, { as: "products", foreignKey: "modifiedUserId"});
  settings.belongsTo(userProfiles, { as: "modifiedUser", foreignKey: "modifiedUserId"});
  userProfiles.hasMany(settings, { as: "settings", foreignKey: "modifiedUserId"});
  userProfiles.belongsTo(userProfiles, { as: "modifiedUser", foreignKey: "modifiedUserId"});
  userProfiles.hasMany(userProfiles, { as: "userProfiles", foreignKey: "modifiedUserId"});
  userProfiles.belongsTo(userRole, { as: "role", foreignKey: "roleId"});
  userRole.hasMany(userProfiles, { as: "userProfiles", foreignKey: "roleId"});

  return {
    bankAccount: bankAccount,
    buyedTaxReports: buyedTaxReports,
    documentType: documentType,
    invoiceProducts: invoiceProducts,
    invoiceRunning: invoiceRunning,
    invoices: invoices,
    jobs: jobs,
    paymentStatus: paymentStatus,
    paymentTransactions: paymentTransactions,
    platform: platform,
    productGroup: productGroup,
    productImages: productImages,
    productImports: productImports,
    productStatus: productStatus,
    products: products,
    settings: settings,
    shop: shop,
    sourceType: sourceType,
    statusType: statusType,
    transportType: transportType,
    userProfiles: userProfiles,
    userRole: userRole,
  };
}
