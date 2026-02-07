import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { products, productsId } from './products';

export interface productImagesAttributes {
  imageId: number;
  productId: number;
  shopId: number;
  imageUrl: string;
  isDefault: number;
  createdDatetime: Date;
}

export type productImagesPk = "imageId";
export type productImagesId = productImages[productImagesPk];
export type productImagesOptionalAttributes = "imageId" | "isDefault" | "createdDatetime";
export type productImagesCreationAttributes = Optional<productImagesAttributes, productImagesOptionalAttributes>;

export class productImages extends Model<productImagesAttributes, productImagesCreationAttributes> implements productImagesAttributes {
  imageId!: number;
  productId!: number;
  shopId!: number;
  imageUrl!: string;
  isDefault!: number;
  createdDatetime!: Date;

  // productImages belongsTo products via productId
  product!: products;
  getProduct!: Sequelize.BelongsToGetAssociationMixin<products>;
  setProduct!: Sequelize.BelongsToSetAssociationMixin<products, productsId>;
  createProduct!: Sequelize.BelongsToCreateAssociationMixin<products>;

  static initModel(sequelize: Sequelize.Sequelize): typeof productImages {
    return productImages.init({
    imageId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'productId'
      }
    },
    shopId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    isDefault: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    createdDatetime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    }
  }, {
    sequelize,
    tableName: 'productImages',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "imageId" },
        ]
      },
      {
        name: "productImages_products_FK",
        using: "BTREE",
        fields: [
          { name: "productId" },
        ]
      },
    ]
  });
  }
}
