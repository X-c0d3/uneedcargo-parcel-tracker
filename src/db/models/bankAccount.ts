import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { paymentTransactions, paymentTransactionsId } from './paymentTransactions';
import type { userProfiles, userProfilesId } from './userProfiles';

export interface bankAccountAttributes {
  bankAccountId: number;
  bankAccountName: string;
  bankAccountNo: string;
  colorRgb: string;
  shortName: string;
  isDeleted: number;
  createdDatetime: Date;
  modifiedDatetime?: Date;
  modifiedUserId?: number;
  shopId: number;
}

export type bankAccountPk = "bankAccountId";
export type bankAccountId = bankAccount[bankAccountPk];
export type bankAccountOptionalAttributes = "bankAccountId" | "isDeleted" | "createdDatetime" | "modifiedDatetime" | "modifiedUserId";
export type bankAccountCreationAttributes = Optional<bankAccountAttributes, bankAccountOptionalAttributes>;

export class bankAccount extends Model<bankAccountAttributes, bankAccountCreationAttributes> implements bankAccountAttributes {
  bankAccountId!: number;
  bankAccountName!: string;
  bankAccountNo!: string;
  colorRgb!: string;
  shortName!: string;
  isDeleted!: number;
  createdDatetime!: Date;
  modifiedDatetime?: Date;
  modifiedUserId?: number;
  shopId!: number;

  // bankAccount hasMany paymentTransactions via bankAccountId
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
  // bankAccount belongsTo userProfiles via modifiedUserId
  modifiedUser!: userProfiles;
  getModifiedUser!: Sequelize.BelongsToGetAssociationMixin<userProfiles>;
  setModifiedUser!: Sequelize.BelongsToSetAssociationMixin<userProfiles, userProfilesId>;
  createModifiedUser!: Sequelize.BelongsToCreateAssociationMixin<userProfiles>;

  static initModel(sequelize: Sequelize.Sequelize): typeof bankAccount {
    return bankAccount.init({
    bankAccountId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    bankAccountName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    bankAccountNo: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    colorRgb: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    shortName: {
      type: DataTypes.STRING(100),
      allowNull: false
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
    tableName: 'bankAccount',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "bankAccountId" },
        ]
      },
      {
        name: "bankAccount_userProfiles_FK",
        using: "BTREE",
        fields: [
          { name: "modifiedUserId" },
        ]
      },
    ]
  });
  }
}
