import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { paymentTransactions, paymentTransactionsId } from './paymentTransactions';
import type { userProfiles, userProfilesId } from './userProfiles';

export interface paymentStatusAttributes {
  paymentStatusId: number;
  paymentStatusName: string;
  isDeleted: number;
  createdDatetime: Date;
  modifiedDatetime?: Date;
  modifiedUserId?: number;
}

export type paymentStatusPk = "paymentStatusId";
export type paymentStatusId = paymentStatus[paymentStatusPk];
export type paymentStatusOptionalAttributes = "isDeleted" | "createdDatetime" | "modifiedDatetime" | "modifiedUserId";
export type paymentStatusCreationAttributes = Optional<paymentStatusAttributes, paymentStatusOptionalAttributes>;

export class paymentStatus extends Model<paymentStatusAttributes, paymentStatusCreationAttributes> implements paymentStatusAttributes {
  paymentStatusId!: number;
  paymentStatusName!: string;
  isDeleted!: number;
  createdDatetime!: Date;
  modifiedDatetime?: Date;
  modifiedUserId?: number;

  // paymentStatus hasMany paymentTransactions via paymentStatusId
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
  // paymentStatus belongsTo userProfiles via modifiedUserId
  modifiedUser!: userProfiles;
  getModifiedUser!: Sequelize.BelongsToGetAssociationMixin<userProfiles>;
  setModifiedUser!: Sequelize.BelongsToSetAssociationMixin<userProfiles, userProfilesId>;
  createModifiedUser!: Sequelize.BelongsToCreateAssociationMixin<userProfiles>;

  static initModel(sequelize: Sequelize.Sequelize): typeof paymentStatus {
    return paymentStatus.init({
    paymentStatusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    paymentStatusName: {
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
    }
  }, {
    sequelize,
    tableName: 'paymentStatus',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "paymentStatusId" },
        ]
      },
      {
        name: "paymentStatus_userProfiles_FK",
        using: "BTREE",
        fields: [
          { name: "modifiedUserId" },
        ]
      },
    ]
  });
  }
}
