import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { products, productsId } from './products';
import type { userProfiles, userProfilesId } from './userProfiles';

export interface productGroupAttributes {
  groupId: number;
  groupName: string;
  isDeleted: number;
  createdDatetime: Date;
  modifiedDatetime?: Date;
  modifiedUserId?: number;
  shopId: number;
}

export type productGroupPk = "groupId";
export type productGroupId = productGroup[productGroupPk];
export type productGroupOptionalAttributes = "isDeleted" | "createdDatetime" | "modifiedDatetime" | "modifiedUserId";
export type productGroupCreationAttributes = Optional<productGroupAttributes, productGroupOptionalAttributes>;

export class productGroup extends Model<productGroupAttributes, productGroupCreationAttributes> implements productGroupAttributes {
  groupId!: number;
  groupName!: string;
  isDeleted!: number;
  createdDatetime!: Date;
  modifiedDatetime?: Date;
  modifiedUserId?: number;
  shopId!: number;

  // productGroup hasMany products via groupId
  products!: products[];
  getProducts!: Sequelize.HasManyGetAssociationsMixin<products>;
  setProducts!: Sequelize.HasManySetAssociationsMixin<products, productsId>;
  addProduct!: Sequelize.HasManyAddAssociationMixin<products, productsId>;
  addProducts!: Sequelize.HasManyAddAssociationsMixin<products, productsId>;
  createProduct!: Sequelize.HasManyCreateAssociationMixin<products>;
  removeProduct!: Sequelize.HasManyRemoveAssociationMixin<products, productsId>;
  removeProducts!: Sequelize.HasManyRemoveAssociationsMixin<products, productsId>;
  hasProduct!: Sequelize.HasManyHasAssociationMixin<products, productsId>;
  hasProducts!: Sequelize.HasManyHasAssociationsMixin<products, productsId>;
  countProducts!: Sequelize.HasManyCountAssociationsMixin;
  // productGroup belongsTo userProfiles via modifiedUserId
  modifiedUser!: userProfiles;
  getModifiedUser!: Sequelize.BelongsToGetAssociationMixin<userProfiles>;
  setModifiedUser!: Sequelize.BelongsToSetAssociationMixin<userProfiles, userProfilesId>;
  createModifiedUser!: Sequelize.BelongsToCreateAssociationMixin<userProfiles>;

  static initModel(sequelize: Sequelize.Sequelize): typeof productGroup {
    return productGroup.init({
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    groupName: {
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
    },
    shopId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'productGroup',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "groupId" },
        ]
      },
      {
        name: "productGroup_userProfiles_FK",
        using: "BTREE",
        fields: [
          { name: "modifiedUserId" },
        ]
      },
    ]
  });
  }
}
