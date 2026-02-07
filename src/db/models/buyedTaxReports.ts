import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { userProfiles, userProfilesId } from './userProfiles';

export interface buyedTaxReportsAttributes {
  invoiceId: number;
  invoiceNo: string;
  issueDatetime: Date;
  customerName: string;
  address: string;
  branchNo?: string;
  taxId: string;
  phoneNumber?: string;
  email?: string;
  purchaseOrderNo?: string;
  totalPrice: number;
  preVat: number;
  vat: number;
  noted?: string;
  isDeleted: number;
  createdDatetime: Date;
  modifiedDatetime?: Date;
  modifiedUserId?: number;
  shopId: number;
}

export type buyedTaxReportsPk = "invoiceId";
export type buyedTaxReportsId = buyedTaxReports[buyedTaxReportsPk];
export type buyedTaxReportsOptionalAttributes = "invoiceId" | "issueDatetime" | "branchNo" | "phoneNumber" | "email" | "purchaseOrderNo" | "noted" | "isDeleted" | "createdDatetime" | "modifiedDatetime" | "modifiedUserId";
export type buyedTaxReportsCreationAttributes = Optional<buyedTaxReportsAttributes, buyedTaxReportsOptionalAttributes>;

export class buyedTaxReports extends Model<buyedTaxReportsAttributes, buyedTaxReportsCreationAttributes> implements buyedTaxReportsAttributes {
  invoiceId!: number;
  invoiceNo!: string;
  issueDatetime!: Date;
  customerName!: string;
  address!: string;
  branchNo?: string;
  taxId!: string;
  phoneNumber?: string;
  email?: string;
  purchaseOrderNo?: string;
  totalPrice!: number;
  preVat!: number;
  vat!: number;
  noted?: string;
  isDeleted!: number;
  createdDatetime!: Date;
  modifiedDatetime?: Date;
  modifiedUserId?: number;
  shopId!: number;

  // buyedTaxReports belongsTo userProfiles via modifiedUserId
  modifiedUser!: userProfiles;
  getModifiedUser!: Sequelize.BelongsToGetAssociationMixin<userProfiles>;
  setModifiedUser!: Sequelize.BelongsToSetAssociationMixin<userProfiles, userProfilesId>;
  createModifiedUser!: Sequelize.BelongsToCreateAssociationMixin<userProfiles>;

  static initModel(sequelize: Sequelize.Sequelize): typeof buyedTaxReports {
    return buyedTaxReports.init({
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
    branchNo: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    taxId: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    purchaseOrderNo: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    totalPrice: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: false
    },
    preVat: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: false
    },
    vat: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: false
    },
    noted: {
      type: DataTypes.STRING(200),
      allowNull: true
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
      allowNull: true,
      references: {
        model: 'userProfiles',
        key: 'userId'
      }
    },
    shopId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'buyedTaxReports',
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
        name: "buyedTaxReports_userProfiles_FK",
        using: "BTREE",
        fields: [
          { name: "modifiedUserId" },
        ]
      },
    ]
  });
  }
}
