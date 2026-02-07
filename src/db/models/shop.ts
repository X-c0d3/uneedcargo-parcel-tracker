import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { userProfiles, userProfilesId } from './userProfiles';

export interface shopAttributes {
  shopId: number;
  shopName: string;
  address?: string;
  email?: string;
  telNo?: string;
  mobileNo?: string;
  isVat?: number;
  taxNo?: string;
  fax?: string;
  isHeadOffice?: number;
  branchNo?: string;
  website?: string;
  businessType?: number;
  logo?: string;
  signature?: string;
  isActive: number;
  isDeleted: number;
  createdDatetime: Date;
  createdUserId?: number;
  modifiedDatetime?: Date;
  modifiedUserId?: number;
}

export type shopPk = "shopId";
export type shopId = shop[shopPk];
export type shopOptionalAttributes = "shopId" | "address" | "email" | "telNo" | "mobileNo" | "isVat" | "taxNo" | "fax" | "isHeadOffice" | "branchNo" | "website" | "businessType" | "logo" | "signature" | "isActive" | "isDeleted" | "createdDatetime" | "createdUserId" | "modifiedDatetime" | "modifiedUserId";
export type shopCreationAttributes = Optional<shopAttributes, shopOptionalAttributes>;

export class shop extends Model<shopAttributes, shopCreationAttributes> implements shopAttributes {
  shopId!: number;
  shopName!: string;
  address?: string;
  email?: string;
  telNo?: string;
  mobileNo?: string;
  isVat?: number;
  taxNo?: string;
  fax?: string;
  isHeadOffice?: number;
  branchNo?: string;
  website?: string;
  businessType?: number;
  logo?: string;
  signature?: string;
  isActive!: number;
  isDeleted!: number;
  createdDatetime!: Date;
  createdUserId?: number;
  modifiedDatetime?: Date;
  modifiedUserId?: number;

  // shop hasMany userProfiles via shopId
  userProfiles!: userProfiles[];
  getUserProfiles!: Sequelize.HasManyGetAssociationsMixin<userProfiles>;
  setUserProfiles!: Sequelize.HasManySetAssociationsMixin<userProfiles, userProfilesId>;
  addUserProfile!: Sequelize.HasManyAddAssociationMixin<userProfiles, userProfilesId>;
  addUserProfiles!: Sequelize.HasManyAddAssociationsMixin<userProfiles, userProfilesId>;
  createUserProfile!: Sequelize.HasManyCreateAssociationMixin<userProfiles>;
  removeUserProfile!: Sequelize.HasManyRemoveAssociationMixin<userProfiles, userProfilesId>;
  removeUserProfiles!: Sequelize.HasManyRemoveAssociationsMixin<userProfiles, userProfilesId>;
  hasUserProfile!: Sequelize.HasManyHasAssociationMixin<userProfiles, userProfilesId>;
  hasUserProfiles!: Sequelize.HasManyHasAssociationsMixin<userProfiles, userProfilesId>;
  countUserProfiles!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof shop {
    return shop.init({
    shopId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    shopName: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    telNo: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    mobileNo: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    isVat: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    taxNo: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    fax: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    isHeadOffice: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    branchNo: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    website: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    businessType: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    logo: {
      type: DataTypes.STRING(2000),
      allowNull: true
    },
    signature: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
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
    createdUserId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    modifiedDatetime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    modifiedUserId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'shop',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "shopId" },
        ]
      },
    ]
  });
  }
}
