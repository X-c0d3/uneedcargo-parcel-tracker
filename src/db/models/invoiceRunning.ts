import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { documentType, documentTypeId } from './documentType';

export interface invoiceRunningAttributes {
  invoiceRunningId: number;
  year?: number;
  runingNo: number;
  documentType: number;
  modifiedDateTime: Date;
  description?: string;
  shopId: number;
}

export type invoiceRunningPk = "invoiceRunningId";
export type invoiceRunningId = invoiceRunning[invoiceRunningPk];
export type invoiceRunningOptionalAttributes = "invoiceRunningId" | "year" | "runingNo" | "modifiedDateTime" | "description";
export type invoiceRunningCreationAttributes = Optional<invoiceRunningAttributes, invoiceRunningOptionalAttributes>;

export class invoiceRunning extends Model<invoiceRunningAttributes, invoiceRunningCreationAttributes> implements invoiceRunningAttributes {
  invoiceRunningId!: number;
  year?: number;
  runingNo!: number;
  documentType!: number;
  modifiedDateTime!: Date;
  description?: string;
  shopId!: number;

  // invoiceRunning belongsTo documentType via documentType
  documentType_documentType!: documentType;
  getDocumentType_documentType!: Sequelize.BelongsToGetAssociationMixin<documentType>;
  setDocumentType_documentType!: Sequelize.BelongsToSetAssociationMixin<documentType, documentTypeId>;
  createDocumentType_documentType!: Sequelize.BelongsToCreateAssociationMixin<documentType>;

  static initModel(sequelize: Sequelize.Sequelize): typeof invoiceRunning {
    return invoiceRunning.init({
    invoiceRunningId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    runingNo: {
      type: DataTypes.INTEGER,
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
    modifiedDateTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    shopId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'invoiceRunning',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "invoiceRunningId" },
        ]
      },
      {
        name: "invoiceRuning_documentType_FK",
        using: "BTREE",
        fields: [
          { name: "documentType" },
        ]
      },
    ]
  });
  }
}
