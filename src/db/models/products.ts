import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { productGroup, productGroupId } from './productGroup';
import type { productImages, productImagesId } from './productImages';
import type { productImports, productImportsId } from './productImports';
import type { productStatus, productStatusId } from './productStatus';
import type { userProfiles, userProfilesId } from './userProfiles';

export interface productsAttributes {
  productId: number;
  productName: string;
  sku?: string;
  groupId: number;
  damaged: number;
  testing: number;
  balance: number;
  url?: string;
  productStatusId: number;
  noted?: string;
  isDeleted: number;
  createdDatetime: Date;
  modifiedDatetime?: Date;
  modifiedUserId: number;
  shopId: number;
}

export type productsPk = "productId";
export type productsId = products[productsPk];
export type productsOptionalAttributes = "productId" | "sku" | "balance" | "url" | "noted" | "isDeleted" | "createdDatetime" | "modifiedDatetime";
export type productsCreationAttributes = Optional<productsAttributes, productsOptionalAttributes>;

export class products extends Model<productsAttributes, productsCreationAttributes> implements productsAttributes {
  productId!: number;
  productName!: string;
  sku?: string;
  groupId!: number;
  damaged!: number;
  testing!: number;
  balance!: number;
  url?: string;
  productStatusId!: number;
  noted?: string;
  isDeleted!: number;
  createdDatetime!: Date;
  modifiedDatetime?: Date;
  modifiedUserId!: number;
  shopId!: number;

  // products belongsTo productGroup via groupId
  group!: productGroup;
  getGroup!: Sequelize.BelongsToGetAssociationMixin<productGroup>;
  setGroup!: Sequelize.BelongsToSetAssociationMixin<productGroup, productGroupId>;
  createGroup!: Sequelize.BelongsToCreateAssociationMixin<productGroup>;
  // products belongsTo productStatus via productStatusId
  productStatus!: productStatus;
  getProductStatus!: Sequelize.BelongsToGetAssociationMixin<productStatus>;
  setProductStatus!: Sequelize.BelongsToSetAssociationMixin<productStatus, productStatusId>;
  createProductStatus!: Sequelize.BelongsToCreateAssociationMixin<productStatus>;
  // products hasMany productImages via productId
  productImages!: productImages[];
  getProductImages!: Sequelize.HasManyGetAssociationsMixin<productImages>;
  setProductImages!: Sequelize.HasManySetAssociationsMixin<productImages, productImagesId>;
  addProductImage!: Sequelize.HasManyAddAssociationMixin<productImages, productImagesId>;
  addProductImages!: Sequelize.HasManyAddAssociationsMixin<productImages, productImagesId>;
  createProductImage!: Sequelize.HasManyCreateAssociationMixin<productImages>;
  removeProductImage!: Sequelize.HasManyRemoveAssociationMixin<productImages, productImagesId>;
  removeProductImages!: Sequelize.HasManyRemoveAssociationsMixin<productImages, productImagesId>;
  hasProductImage!: Sequelize.HasManyHasAssociationMixin<productImages, productImagesId>;
  hasProductImages!: Sequelize.HasManyHasAssociationsMixin<productImages, productImagesId>;
  countProductImages!: Sequelize.HasManyCountAssociationsMixin;
  // products hasMany productImports via productId
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
  // products belongsTo userProfiles via modifiedUserId
  modifiedUser!: userProfiles;
  getModifiedUser!: Sequelize.BelongsToGetAssociationMixin<userProfiles>;
  setModifiedUser!: Sequelize.BelongsToSetAssociationMixin<userProfiles, userProfilesId>;
  createModifiedUser!: Sequelize.BelongsToCreateAssociationMixin<userProfiles>;

  static initModel(sequelize: Sequelize.Sequelize): typeof products {
    return products.init({
    productId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    productName: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    sku: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'productGroup',
        key: 'groupId'
      }
    },
    damaged: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    testing: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    url: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    productStatusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'productStatus',
        key: 'productStatusId'
      }
    },
    noted: {
      type: DataTypes.STRING(200),
      allowNull: true
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
    tableName: 'products',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "productId" },
        ]
      },
      {
        name: "products_productGroup_FK",
        using: "BTREE",
        fields: [
          { name: "groupId" },
        ]
      },
      {
        name: "products_productStatus_FK",
        using: "BTREE",
        fields: [
          { name: "productStatusId" },
        ]
      },
      {
        name: "products_userProfiles_FK",
        using: "BTREE",
        fields: [
          { name: "modifiedUserId" },
        ]
      },
    ]
  });
  }
}
