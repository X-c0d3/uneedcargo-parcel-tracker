import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { paymentTransactions, paymentTransactionsId } from './paymentTransactions';

export interface sourceTypeAttributes {
  sourceTypeId: number;
  sourceName: string;
  isDeleted: number;
}

export type sourceTypePk = "sourceTypeId";
export type sourceTypeId = sourceType[sourceTypePk];
export type sourceTypeOptionalAttributes = "isDeleted";
export type sourceTypeCreationAttributes = Optional<sourceTypeAttributes, sourceTypeOptionalAttributes>;

export class sourceType extends Model<sourceTypeAttributes, sourceTypeCreationAttributes> implements sourceTypeAttributes {
  sourceTypeId!: number;
  sourceName!: string;
  isDeleted!: number;

  // sourceType hasMany paymentTransactions via sourceTypeId
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

  static initModel(sequelize: Sequelize.Sequelize): typeof sourceType {
    return sourceType.init({
    sourceTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    sourceName: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'sourceType',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "sourceTypeId" },
        ]
      },
    ]
  });
  }
}
