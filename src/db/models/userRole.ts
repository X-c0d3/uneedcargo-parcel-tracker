import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { userProfiles, userProfilesId } from './userProfiles';

export interface userRoleAttributes {
  roleId: number;
  roleName: string;
  isDeleted: number;
  createdDatetime: Date;
  modifiedDatetime?: Date;
  shopId: number;
}

export type userRolePk = "roleId";
export type userRoleId = userRole[userRolePk];
export type userRoleOptionalAttributes = "roleId" | "createdDatetime" | "modifiedDatetime";
export type userRoleCreationAttributes = Optional<userRoleAttributes, userRoleOptionalAttributes>;

export class userRole extends Model<userRoleAttributes, userRoleCreationAttributes> implements userRoleAttributes {
  roleId!: number;
  roleName!: string;
  isDeleted!: number;
  createdDatetime!: Date;
  modifiedDatetime?: Date;
  shopId!: number;

  // userRole hasMany userProfiles via roleId
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

  static initModel(sequelize: Sequelize.Sequelize): typeof userRole {
    return userRole.init({
    roleId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    roleName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false
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
    shopId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'userRole',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "roleId" },
        ]
      },
    ]
  });
  }
}
