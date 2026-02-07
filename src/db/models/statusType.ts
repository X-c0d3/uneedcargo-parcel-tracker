import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { productImports, productImportsId } from './productImports';

export interface statusTypeAttributes {
  statusTypeId: number;
  statusName: string;
}

export type statusTypePk = "statusTypeId";
export type statusTypeId = statusType[statusTypePk];
export type statusTypeCreationAttributes = statusTypeAttributes;

export class statusType extends Model<statusTypeAttributes, statusTypeCreationAttributes> implements statusTypeAttributes {
  statusTypeId!: number;
  statusName!: string;

  // statusType hasMany productImports via statusTypeId
  productImports!: productImports[];
  getProductImports!: Sequelize.HasManyGetAssociationsMixin<productImports>;
  setProductImports!: Sequelize.HasManySetAssociationsMixin<productImports, productImportsId>;
  addProductImport!: Sequelize.HasManyAddAssociationMixin<productImports, productImportsId>;
  addProductImports!: Sequelize.HasManyAddAssociationsMixin<productImports, productImportsId>;
  createProductImport!: Sequelize.HasManyCreateAssociationMixin<productImports>;
  removeProductImport!: Sequelize.HasManyRemoveAssociationMixin<productImports, productImportsId>;
  removeProductImports!: Sequelize.HasManyRemoveAssociationsMixin<productImports, productImportsId>;
  hasProductImport!: Sequelize.HasManyHasAssociationMixin<productImports, productImportsId>;
  hasProductImports!: Sequelize.HasManyHasAssociationsMixin<productImports, productImportsId>;
  countProductImports!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof statusType {
    return statusType.init({
    statusTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    statusName: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'statusType',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "statusTypeId" },
        ]
      },
    ]
  });
  }
}
