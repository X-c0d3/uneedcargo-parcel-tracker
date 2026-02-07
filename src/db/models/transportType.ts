import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { productImports, productImportsId } from './productImports';

export interface transportTypeAttributes {
  transportTypeId: number;
  name: string;
}

export type transportTypePk = "transportTypeId";
export type transportTypeId = transportType[transportTypePk];
export type transportTypeOptionalAttributes = "transportTypeId";
export type transportTypeCreationAttributes = Optional<transportTypeAttributes, transportTypeOptionalAttributes>;

export class transportType extends Model<transportTypeAttributes, transportTypeCreationAttributes> implements transportTypeAttributes {
  transportTypeId!: number;
  name!: string;

  // transportType hasMany productImports via transportTypeId
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

  static initModel(sequelize: Sequelize.Sequelize): typeof transportType {
    return transportType.init({
    transportTypeId: {
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
    tableName: 'transportType',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "transportTypeId" },
        ]
      },
    ]
  });
  }
}
