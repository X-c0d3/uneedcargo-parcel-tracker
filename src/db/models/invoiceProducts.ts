import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { invoices, invoicesId } from './invoices';

export interface invoiceProductsAttributes {
  invoiceProductId: number;
  invoiceId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  createdDatetime: Date;
}

export type invoiceProductsPk = "invoiceProductId";
export type invoiceProductsId = invoiceProducts[invoiceProductsPk];
export type invoiceProductsOptionalAttributes = "invoiceProductId" | "createdDatetime";
export type invoiceProductsCreationAttributes = Optional<invoiceProductsAttributes, invoiceProductsOptionalAttributes>;

export class invoiceProducts extends Model<invoiceProductsAttributes, invoiceProductsCreationAttributes> implements invoiceProductsAttributes {
  invoiceProductId!: number;
  invoiceId!: number;
  productName!: string;
  quantity!: number;
  unitPrice!: number;
  createdDatetime!: Date;

  // invoiceProducts belongsTo invoices via invoiceId
  invoice!: invoices;
  getInvoice!: Sequelize.BelongsToGetAssociationMixin<invoices>;
  setInvoice!: Sequelize.BelongsToSetAssociationMixin<invoices, invoicesId>;
  createInvoice!: Sequelize.BelongsToCreateAssociationMixin<invoices>;

  static initModel(sequelize: Sequelize.Sequelize): typeof invoiceProducts {
    return invoiceProducts.init({
    invoiceProductId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    invoiceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'invoices',
        key: 'invoiceId'
      }
    },
    productName: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    unitPrice: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: false
    },
    createdDatetime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    }
  }, {
    sequelize,
    tableName: 'invoiceProducts',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "invoiceProductId" },
        ]
      },
      {
        name: "productInvoice_invoices_FK",
        using: "BTREE",
        fields: [
          { name: "invoiceId" },
        ]
      },
    ]
  });
  }
}
