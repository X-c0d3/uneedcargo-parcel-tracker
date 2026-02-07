import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { invoiceRunning, invoiceRunningId } from './invoiceRunning';
import type { invoices, invoicesId } from './invoices';

export interface documentTypeAttributes {
  documentTypeId: number;
  name: string;
  isDeleted: number;
}

export type documentTypePk = "documentTypeId";
export type documentTypeId = documentType[documentTypePk];
export type documentTypeOptionalAttributes = "isDeleted";
export type documentTypeCreationAttributes = Optional<documentTypeAttributes, documentTypeOptionalAttributes>;

export class documentType extends Model<documentTypeAttributes, documentTypeCreationAttributes> implements documentTypeAttributes {
  documentTypeId!: number;
  name!: string;
  isDeleted!: number;

  // documentType hasMany invoiceRunning via documentType
  invoiceRunnings!: invoiceRunning[];
  getInvoiceRunnings!: Sequelize.HasManyGetAssociationsMixin<invoiceRunning>;
  setInvoiceRunnings!: Sequelize.HasManySetAssociationsMixin<invoiceRunning, invoiceRunningId>;
  addInvoiceRunning!: Sequelize.HasManyAddAssociationMixin<invoiceRunning, invoiceRunningId>;
  addInvoiceRunnings!: Sequelize.HasManyAddAssociationsMixin<invoiceRunning, invoiceRunningId>;
  createInvoiceRunning!: Sequelize.HasManyCreateAssociationMixin<invoiceRunning>;
  removeInvoiceRunning!: Sequelize.HasManyRemoveAssociationMixin<invoiceRunning, invoiceRunningId>;
  removeInvoiceRunnings!: Sequelize.HasManyRemoveAssociationsMixin<invoiceRunning, invoiceRunningId>;
  hasInvoiceRunning!: Sequelize.HasManyHasAssociationMixin<invoiceRunning, invoiceRunningId>;
  hasInvoiceRunnings!: Sequelize.HasManyHasAssociationsMixin<invoiceRunning, invoiceRunningId>;
  countInvoiceRunnings!: Sequelize.HasManyCountAssociationsMixin;
  // documentType hasMany invoices via documentType
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

  static initModel(sequelize: Sequelize.Sequelize): typeof documentType {
    return documentType.init({
    documentTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'documentType',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "documentTypeId" },
        ]
      },
    ]
  });
  }
}
