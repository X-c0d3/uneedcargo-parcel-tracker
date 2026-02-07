import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { bankAccount, bankAccountId } from './bankAccount';
import type { paymentStatus, paymentStatusId } from './paymentStatus';
import type { sourceType, sourceTypeId } from './sourceType';
import type { userProfiles, userProfilesId } from './userProfiles';

export interface paymentTransactionsAttributes {
  paymentId: number;
  paymentName: string;
  paymentStatusId: number;
  quantity?: number;
  paymentDatetime: Date;
  sourceTypeId: number;
  price: number;
  isExpense: number;
  bankAccountId?: number;
  isClaimTax: number;
  isAdvanced: number;
  paymentDetails: string;
  isDeleted?: number;
  createdDatetime: Date;
  modifiedDatetime?: Date;
  modifiedUserId: number;
  shopId: number;
}

export type paymentTransactionsPk = "paymentId";
export type paymentTransactionsId = paymentTransactions[paymentTransactionsPk];
export type paymentTransactionsOptionalAttributes = "paymentId" | "quantity" | "bankAccountId" | "isClaimTax" | "isAdvanced" | "isDeleted" | "createdDatetime" | "modifiedDatetime";
export type paymentTransactionsCreationAttributes = Optional<paymentTransactionsAttributes, paymentTransactionsOptionalAttributes>;

export class paymentTransactions extends Model<paymentTransactionsAttributes, paymentTransactionsCreationAttributes> implements paymentTransactionsAttributes {
  paymentId!: number;
  paymentName!: string;
  paymentStatusId!: number;
  quantity?: number;
  paymentDatetime!: Date;
  sourceTypeId!: number;
  price!: number;
  isExpense!: number;
  bankAccountId?: number;
  isClaimTax!: number;
  isAdvanced!: number;
  paymentDetails!: string;
  isDeleted?: number;
  createdDatetime!: Date;
  modifiedDatetime?: Date;
  modifiedUserId!: number;
  shopId!: number;

  // paymentTransactions belongsTo bankAccount via bankAccountId
  bankAccount!: bankAccount;
  getBankAccount!: Sequelize.BelongsToGetAssociationMixin<bankAccount>;
  setBankAccount!: Sequelize.BelongsToSetAssociationMixin<bankAccount, bankAccountId>;
  createBankAccount!: Sequelize.BelongsToCreateAssociationMixin<bankAccount>;
  // paymentTransactions belongsTo paymentStatus via paymentStatusId
  paymentStatus!: paymentStatus;
  getPaymentStatus!: Sequelize.BelongsToGetAssociationMixin<paymentStatus>;
  setPaymentStatus!: Sequelize.BelongsToSetAssociationMixin<paymentStatus, paymentStatusId>;
  createPaymentStatus!: Sequelize.BelongsToCreateAssociationMixin<paymentStatus>;
  // paymentTransactions belongsTo sourceType via sourceTypeId
  sourceType!: sourceType;
  getSourceType!: Sequelize.BelongsToGetAssociationMixin<sourceType>;
  setSourceType!: Sequelize.BelongsToSetAssociationMixin<sourceType, sourceTypeId>;
  createSourceType!: Sequelize.BelongsToCreateAssociationMixin<sourceType>;
  // paymentTransactions belongsTo userProfiles via modifiedUserId
  modifiedUser!: userProfiles;
  getModifiedUser!: Sequelize.BelongsToGetAssociationMixin<userProfiles>;
  setModifiedUser!: Sequelize.BelongsToSetAssociationMixin<userProfiles, userProfilesId>;
  createModifiedUser!: Sequelize.BelongsToCreateAssociationMixin<userProfiles>;

  static initModel(sequelize: Sequelize.Sequelize): typeof paymentTransactions {
    return paymentTransactions.init({
    paymentId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    paymentName: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    paymentStatusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'paymentStatus',
        key: 'paymentStatusId'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    paymentDatetime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    sourceTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'sourceType',
        key: 'sourceTypeId'
      }
    },
    price: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: false
    },
    isExpense: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    bankAccountId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'bankAccount',
        key: 'bankAccountId'
      }
    },
    isClaimTax: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    isAdvanced: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    paymentDetails: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
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
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'paymentTransactions',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "paymentId" },
        ]
      },
      {
        name: "paymentTransactions_paymentStatus_FK",
        using: "BTREE",
        fields: [
          { name: "paymentStatusId" },
        ]
      },
      {
        name: "paymentTransactions_sourceType_FK",
        using: "BTREE",
        fields: [
          { name: "sourceTypeId" },
        ]
      },
      {
        name: "paymentTransactions_userProfiles_FK",
        using: "BTREE",
        fields: [
          { name: "modifiedUserId" },
        ]
      },
      {
        name: "paymentTransactions_bankAccount_FK",
        using: "BTREE",
        fields: [
          { name: "bankAccountId" },
        ]
      },
    ]
  });
  }
}
