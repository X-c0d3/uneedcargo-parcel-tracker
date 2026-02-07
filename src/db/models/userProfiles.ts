import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { bankAccount, bankAccountId } from './bankAccount';
import type { buyedTaxReports, buyedTaxReportsId } from './buyedTaxReports';
import type { invoices, invoicesId } from './invoices';
import type { paymentStatus, paymentStatusId } from './paymentStatus';
import type { paymentTransactions, paymentTransactionsId } from './paymentTransactions';
import type { productGroup, productGroupId } from './productGroup';
import type { productImports, productImportsId } from './productImports';
import type { products, productsId } from './products';
import type { settings, settingsId } from './settings';
import type { shop, shopId } from './shop';
import type { userRole, userRoleId } from './userRole';

export interface userProfilesAttributes {
  userId: number;
  userName: string;
  password: string;
  salt: string;
  firstName: string;
  lastName: string;
  email: string;
  roleId: number;
  isDeleted: number;
  createdDatetime: Date;
  modifiedDatetime?: Date;
  modifiedUserId: number;
  shopId: number;
}

export type userProfilesPk = "userId";
export type userProfilesId = userProfiles[userProfilesPk];
export type userProfilesOptionalAttributes = "userId" | "isDeleted" | "createdDatetime" | "modifiedDatetime";
export type userProfilesCreationAttributes = Optional<userProfilesAttributes, userProfilesOptionalAttributes>;

export class userProfiles extends Model<userProfilesAttributes, userProfilesCreationAttributes> implements userProfilesAttributes {
  userId!: number;
  userName!: string;
  password!: string;
  salt!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  roleId!: number;
  isDeleted!: number;
  createdDatetime!: Date;
  modifiedDatetime?: Date;
  modifiedUserId!: number;
  shopId!: number;

  // userProfiles belongsTo shop via shopId
  shop!: shop;
  getShop!: Sequelize.BelongsToGetAssociationMixin<shop>;
  setShop!: Sequelize.BelongsToSetAssociationMixin<shop, shopId>;
  createShop!: Sequelize.BelongsToCreateAssociationMixin<shop>;
  // userProfiles hasMany bankAccount via modifiedUserId
  bankAccounts!: bankAccount[];
  getBankAccounts!: Sequelize.HasManyGetAssociationsMixin<bankAccount>;
  setBankAccounts!: Sequelize.HasManySetAssociationsMixin<bankAccount, bankAccountId>;
  addBankAccount!: Sequelize.HasManyAddAssociationMixin<bankAccount, bankAccountId>;
  addBankAccounts!: Sequelize.HasManyAddAssociationsMixin<bankAccount, bankAccountId>;
  createBankAccount!: Sequelize.HasManyCreateAssociationMixin<bankAccount>;
  removeBankAccount!: Sequelize.HasManyRemoveAssociationMixin<bankAccount, bankAccountId>;
  removeBankAccounts!: Sequelize.HasManyRemoveAssociationsMixin<bankAccount, bankAccountId>;
  hasBankAccount!: Sequelize.HasManyHasAssociationMixin<bankAccount, bankAccountId>;
  hasBankAccounts!: Sequelize.HasManyHasAssociationsMixin<bankAccount, bankAccountId>;
  countBankAccounts!: Sequelize.HasManyCountAssociationsMixin;
  // userProfiles hasMany buyedTaxReports via modifiedUserId
  buyedTaxReports!: buyedTaxReports[];
  getBuyedTaxReports!: Sequelize.HasManyGetAssociationsMixin<buyedTaxReports>;
  setBuyedTaxReports!: Sequelize.HasManySetAssociationsMixin<buyedTaxReports, buyedTaxReportsId>;
  addBuyedTaxReport!: Sequelize.HasManyAddAssociationMixin<buyedTaxReports, buyedTaxReportsId>;
  addBuyedTaxReports!: Sequelize.HasManyAddAssociationsMixin<buyedTaxReports, buyedTaxReportsId>;
  createBuyedTaxReport!: Sequelize.HasManyCreateAssociationMixin<buyedTaxReports>;
  removeBuyedTaxReport!: Sequelize.HasManyRemoveAssociationMixin<buyedTaxReports, buyedTaxReportsId>;
  removeBuyedTaxReports!: Sequelize.HasManyRemoveAssociationsMixin<buyedTaxReports, buyedTaxReportsId>;
  hasBuyedTaxReport!: Sequelize.HasManyHasAssociationMixin<buyedTaxReports, buyedTaxReportsId>;
  hasBuyedTaxReports!: Sequelize.HasManyHasAssociationsMixin<buyedTaxReports, buyedTaxReportsId>;
  countBuyedTaxReports!: Sequelize.HasManyCountAssociationsMixin;
  // userProfiles hasMany invoices via modifiedUserId
  invoices!: invoices[];
  getInvoices!: Sequelize.HasManyGetAssociationsMixin<invoices>;
  setInvoices!: Sequelize.HasManySetAssociationsMixin<invoices, invoicesId>;
  addInvoice!: Sequelize.HasManyAddAssociationMixin<invoices, invoicesId>;
  addInvoices!: Sequelize.HasManyAddAssociationsMixin<invoices, invoicesId>;
  createInvoice!: Sequelize.HasManyCreateAssociationMixin<invoices>;
  removeInvoice!: Sequelize.HasManyRemoveAssociationMixin<invoices, invoicesId>;
  removeInvoices!: Sequelize.HasManyRemoveAssociationsMixin<invoices, invoicesId>;
  hasInvoice!: Sequelize.HasManyHasAssociationMixin<invoices, invoicesId>;
  hasInvoices!: Sequelize.HasManyHasAssociationsMixin<invoices, invoicesId>;
  countInvoices!: Sequelize.HasManyCountAssociationsMixin;
  // userProfiles hasMany paymentStatus via modifiedUserId
  paymentStatuses!: paymentStatus[];
  getPaymentStatuses!: Sequelize.HasManyGetAssociationsMixin<paymentStatus>;
  setPaymentStatuses!: Sequelize.HasManySetAssociationsMixin<paymentStatus, paymentStatusId>;
  addPaymentStatus!: Sequelize.HasManyAddAssociationMixin<paymentStatus, paymentStatusId>;
  addPaymentStatuses!: Sequelize.HasManyAddAssociationsMixin<paymentStatus, paymentStatusId>;
  createPaymentStatus!: Sequelize.HasManyCreateAssociationMixin<paymentStatus>;
  removePaymentStatus!: Sequelize.HasManyRemoveAssociationMixin<paymentStatus, paymentStatusId>;
  removePaymentStatuses!: Sequelize.HasManyRemoveAssociationsMixin<paymentStatus, paymentStatusId>;
  hasPaymentStatus!: Sequelize.HasManyHasAssociationMixin<paymentStatus, paymentStatusId>;
  hasPaymentStatuses!: Sequelize.HasManyHasAssociationsMixin<paymentStatus, paymentStatusId>;
  countPaymentStatuses!: Sequelize.HasManyCountAssociationsMixin;
  // userProfiles hasMany paymentTransactions via modifiedUserId
  paymentTransactions!: paymentTransactions[];
  getPaymentTransactions!: Sequelize.HasManyGetAssociationsMixin<paymentTransactions>;
  setPaymentTransactions!: Sequelize.HasManySetAssociationsMixin<paymentTransactions, paymentTransactionsId>;
  addPaymentTransaction!: Sequelize.HasManyAddAssociationMixin<paymentTransactions, paymentTransactionsId>;
  addPaymentTransactions!: Sequelize.HasManyAddAssociationsMixin<paymentTransactions, paymentTransactionsId>;
  createPaymentTransaction!: Sequelize.HasManyCreateAssociationMixin<paymentTransactions>;
  removePaymentTransaction!: Sequelize.HasManyRemoveAssociationMixin<paymentTransactions, paymentTransactionsId>;
  removePaymentTransactions!: Sequelize.HasManyRemoveAssociationsMixin<paymentTransactions, paymentTransactionsId>;
  hasPaymentTransaction!: Sequelize.HasManyHasAssociationMixin<paymentTransactions, paymentTransactionsId>;
  hasPaymentTransactions!: Sequelize.HasManyHasAssociationsMixin<paymentTransactions, paymentTransactionsId>;
  countPaymentTransactions!: Sequelize.HasManyCountAssociationsMixin;
  // userProfiles hasMany productGroup via modifiedUserId
  productGroups!: productGroup[];
  getProductGroups!: Sequelize.HasManyGetAssociationsMixin<productGroup>;
  setProductGroups!: Sequelize.HasManySetAssociationsMixin<productGroup, productGroupId>;
  addProductGroup!: Sequelize.HasManyAddAssociationMixin<productGroup, productGroupId>;
  addProductGroups!: Sequelize.HasManyAddAssociationsMixin<productGroup, productGroupId>;
  createProductGroup!: Sequelize.HasManyCreateAssociationMixin<productGroup>;
  removeProductGroup!: Sequelize.HasManyRemoveAssociationMixin<productGroup, productGroupId>;
  removeProductGroups!: Sequelize.HasManyRemoveAssociationsMixin<productGroup, productGroupId>;
  hasProductGroup!: Sequelize.HasManyHasAssociationMixin<productGroup, productGroupId>;
  hasProductGroups!: Sequelize.HasManyHasAssociationsMixin<productGroup, productGroupId>;
  countProductGroups!: Sequelize.HasManyCountAssociationsMixin;
  // userProfiles hasMany productImports via modifiedUserId
  productImports!: productImports[];
  getProductImports!: Sequelize.HasManyGetAssociationsMixin<productImports>;
  setProductImports!: Sequelize.HasManySetAssociationsMixin<productImports, productImportsId>;
  addProductImport!: Sequelize.HasManyAddAssociationMixin<productImports, productImportsId>;
  addProductImports!: Sequelize.HasManyAddAssociationsMixin<productImports, productImportsId>;
  createProductImport!: Sequelize.HasManyCreateAssociationMixin<productImports>;
  removeProductImport!: Sequelize.HasManyRemoveAssociationMixin<productImports, productImportsId>;
  removeProductImports!: Sequelize.HasManyRemoveAssociationsMixin<productImports, productImportsId>;
  hasProductImport!: Sequelize.HasManyHasAssociationMixin<productImports, productImportsId>;
  hasProductImports!: Sequelize.HasManyHasAssociationsMixin<productImports, productImportsId>;
  countProductImports!: Sequelize.HasManyCountAssociationsMixin;
  // userProfiles hasMany products via modifiedUserId
  products!: products[];
  getProducts!: Sequelize.HasManyGetAssociationsMixin<products>;
  setProducts!: Sequelize.HasManySetAssociationsMixin<products, productsId>;
  addProduct!: Sequelize.HasManyAddAssociationMixin<products, productsId>;
  addProducts!: Sequelize.HasManyAddAssociationsMixin<products, productsId>;
  createProduct!: Sequelize.HasManyCreateAssociationMixin<products>;
  removeProduct!: Sequelize.HasManyRemoveAssociationMixin<products, productsId>;
  removeProducts!: Sequelize.HasManyRemoveAssociationsMixin<products, productsId>;
  hasProduct!: Sequelize.HasManyHasAssociationMixin<products, productsId>;
  hasProducts!: Sequelize.HasManyHasAssociationsMixin<products, productsId>;
  countProducts!: Sequelize.HasManyCountAssociationsMixin;
  // userProfiles hasMany settings via modifiedUserId
  settings!: settings[];
  getSettings!: Sequelize.HasManyGetAssociationsMixin<settings>;
  setSettings!: Sequelize.HasManySetAssociationsMixin<settings, settingsId>;
  addSetting!: Sequelize.HasManyAddAssociationMixin<settings, settingsId>;
  addSettings!: Sequelize.HasManyAddAssociationsMixin<settings, settingsId>;
  createSetting!: Sequelize.HasManyCreateAssociationMixin<settings>;
  removeSetting!: Sequelize.HasManyRemoveAssociationMixin<settings, settingsId>;
  removeSettings!: Sequelize.HasManyRemoveAssociationsMixin<settings, settingsId>;
  hasSetting!: Sequelize.HasManyHasAssociationMixin<settings, settingsId>;
  hasSettings!: Sequelize.HasManyHasAssociationsMixin<settings, settingsId>;
  countSettings!: Sequelize.HasManyCountAssociationsMixin;
  // userProfiles belongsTo userProfiles via modifiedUserId
  modifiedUser!: userProfiles;
  getModifiedUser!: Sequelize.BelongsToGetAssociationMixin<userProfiles>;
  setModifiedUser!: Sequelize.BelongsToSetAssociationMixin<userProfiles, userProfilesId>;
  createModifiedUser!: Sequelize.BelongsToCreateAssociationMixin<userProfiles>;
  // userProfiles belongsTo userRole via roleId
  role!: userRole;
  getRole!: Sequelize.BelongsToGetAssociationMixin<userRole>;
  setRole!: Sequelize.BelongsToSetAssociationMixin<userRole, userRoleId>;
  createRole!: Sequelize.BelongsToCreateAssociationMixin<userRole>;

  static initModel(sequelize: Sequelize.Sequelize): typeof userProfiles {
    return userProfiles.init({
    userId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(300),
      allowNull: false
    },
    salt: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'userRole',
        key: 'roleId'
      }
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    createdDatetime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    },
    modifiedDatetime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    modifiedUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'userProfiles',
        key: 'userId'
      }
    },
    shopId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'shop',
        key: 'shopId'
      }
    }
  }, {
    sequelize,
    tableName: 'userProfiles',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
      {
        name: "userProfiles_userRole_FK",
        using: "BTREE",
        fields: [
          { name: "roleId" },
        ]
      },
      {
        name: "userProfiles_userProfiles_FK",
        using: "BTREE",
        fields: [
          { name: "modifiedUserId" },
        ]
      },
      {
        name: "userProfiles_shop_FK",
        using: "BTREE",
        fields: [
          { name: "shopId" },
        ]
      },
    ]
  });
  }
}
