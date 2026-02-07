import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { invoices, invoicesId } from './invoices';

export interface platformAttributes {
  platformId: number;
  name: string;
}

export type platformPk = "platformId";
export type platformId = platform[platformPk];
export type platformOptionalAttributes = "platformId";
export type platformCreationAttributes = Optional<platformAttributes, platformOptionalAttributes>;

export class platform extends Model<platformAttributes, platformCreationAttributes> implements platformAttributes {
  platformId!: number;
  name!: string;

  // platform hasMany invoices via platformId
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

  static initModel(sequelize: Sequelize.Sequelize): typeof platform {
    return platform.init({
    platformId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'platform',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "platformId" },
        ]
      },
    ]
  });
  }
}
