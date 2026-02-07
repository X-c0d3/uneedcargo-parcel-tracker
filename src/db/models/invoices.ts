import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { documentType, documentTypeId } from './documentType';
import type { invoiceProducts, invoiceProductsId } from './invoiceProducts';
import type { platform, platformId } from './platform';
import type { userProfiles, userProfilesId } from './userProfiles';

export interface invoicesAttributes {
  invoiceId: number;
  invoiceNo: string;
  shopId: number;
  issueDatetime: Date;
  customerName: string;
  address: string;
  taxId?: string;
  phoneNumber?: string;
  email?: string;
  discount?: number;
  shippingCost?: number;
  isRemoveLicense: number;
  isRemoveDate: number;
  purchaseOrderNo?: string;
  includedVat: number;
  isVatCalculated: number;
  documentType: number;
  platformId: number;
  noted?: string;
  isUsePersonTaxInvoice: number;
  isDeleted: number;
  createdDatetime: Date;
  modifiedDatetime?: Date;
  modifiedUserId: number;
}

export type invoicesPk = "invoiceId";
export type invoicesId = invoices[invoicesPk];
export type invoicesOptionalAttributes = "invoiceId" | "issueDatetime" | "taxId" | "phoneNumber" | "email" | "discount" | "shippingCost" | "isRemoveLicense" | "isRemoveDate" | "purchaseOrderNo" | "isVatCalculated" | "noted" | "isUsePersonTaxInvoice" | "isDeleted" | "createdDatetime" | "modifiedDatetime";
export type invoicesCreationAttributes = Optional<invoicesAttributes, invoicesOptionalAttributes>;

export class invoices extends Model<invoicesAttributes, invoicesCreationAttributes> implements invoicesAttributes {
  invoiceId!: number;
  invoiceNo!: string;
  shopId!: number;
  issueDatetime!: Date;
  customerName!: string;
  address!: string;
  taxId?: string;
  phoneNumber?: string;
  email?: string;
  discount?: number;
  shippingCost?: number;
  isRemoveLicense!: number;
  isRemoveDate!: number;
  purchaseOrderNo?: string;
  includedVat!: number;
  isVatCalculated!: number;
  documentType!: number;
  platformId!: number;
  noted?: string;
  isUsePersonTaxInvoice!: number;
  isDeleted!: number;
  createdDatetime!: Date;
  modifiedDatetime?: Date;
  modifiedUserId!: number;

  // invoices belongsTo documentType via documentType
  documentType_documentType!: documentType;
  getDocumentType_documentType!: Sequelize.BelongsToGetAssociationMixin<documentType>;
  setDocumentType_documentType!: Sequelize.BelongsToSetAssociationMixin<documentType, documentTypeId>;
  createDocumentType_documentType!: Sequelize.BelongsToCreateAssociationMixin<documentType>;
  // invoices hasMany invoiceProducts via invoiceId
  invoiceProducts!: invoiceProducts[];
  getInvoiceProducts!: Sequelize.HasManyGetAssociationsMixin<invoiceProducts>;
  setInvoiceProducts!: Sequelize.HasManySetAssociationsMixin<invoiceProducts, invoiceProductsId>;
  addInvoiceProduct!: Sequelize.HasManyAddAssociationMixin<invoiceProducts, invoiceProductsId>;
  addInvoiceProducts!: Sequelize.HasManyAddAssociationsMixin<invoiceProducts, invoiceProductsId>;
  createInvoiceProduct!: Sequelize.HasManyCreateAssociationMixin<invoiceProducts>;
  removeInvoiceProduct!: Sequelize.HasManyRemoveAssociationMixin<invoiceProducts, invoiceProductsId>;
  removeInvoiceProducts!: Sequelize.HasManyRemoveAssociationsMixin<invoiceProducts, invoiceProductsId>;
  hasInvoiceProduct!: Sequelize.HasManyHasAssociationMixin<invoiceProducts, invoiceProductsId>;
  hasInvoiceProducts!: Sequelize.HasManyHasAssociationsMixin<invoiceProducts, invoiceProductsId>;
  countInvoiceProducts!: Sequelize.HasManyCountAssociationsMixin;
  // invoices belongsTo platform via platformId
  platform!: platform;
  getPlatform!: Sequelize.BelongsToGetAssociationMixin<platform>;
  setPlatform!: Sequelize.BelongsToSetAssociationMixin<platform, platformId>;
  createPlatform!: Sequelize.BelongsToCreateAssociationMixin<platform>;
  // invoices belongsTo userProfiles via modifiedUserId
  modifiedUser!: userProfiles;
  getModifiedUser!: Sequelize.BelongsToGetAssociationMixin<userProfiles>;
  setModifiedUser!: Sequelize.BelongsToSetAssociationMixin<userProfiles, userProfilesId>;
  createModifiedUser!: Sequelize.BelongsToCreateAssociationMixin<userProfiles>;

  static initModel(sequelize: Sequelize.Sequelize): typeof invoices {
    return invoices.init({
    invoiceId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    invoiceNo: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    shopId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    issueDatetime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    },
    customerName: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    taxId: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    phoneNumber: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    discount: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: true
    },
    shippingCost: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: true
    },
    isRemoveLicense: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    isRemoveDate: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    purchaseOrderNo: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    includedVat: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    isVatCalculated: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    },
    documentType: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'documentType',
        key: 'documentTypeId'
      }
    },
    platformId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'platform',
        key: 'platformId'
      }
    },
    noted: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    isUsePersonTaxInvoice: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
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
    }
  }, {
    sequelize,
    tableName: 'invoices',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "invoiceId" },
        ]
      },
      {
        name: "invoices_documentType_FK",
        using: "BTREE",
        fields: [
          { name: "documentType" },
        ]
      },
      {
        name: "invoices_platform_FK",
        using: "BTREE",
        fields: [
          { name: "platformId" },
        ]
      },
      {
        name: "invoices_userProfiles_FK",
        using: "BTREE",
        fields: [
          { name: "modifiedUserId" },
        ]
      },
    ]
  });
  }
}
