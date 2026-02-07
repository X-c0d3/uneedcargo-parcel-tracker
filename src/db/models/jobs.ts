import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface jobsAttributes {
  jobId: number;
  shopId: number;
  name: string;
  api_url: string;
  cookie?: string;
  lastRun?: Date;
  username?: string;
  password?: string;
  actived?: number;
  modifiedDatetime?: Date;
}

export type jobsPk = "jobId";
export type jobsId = jobs[jobsPk];
export type jobsOptionalAttributes = "jobId" | "cookie" | "lastRun" | "username" | "password" | "actived" | "modifiedDatetime";
export type jobsCreationAttributes = Optional<jobsAttributes, jobsOptionalAttributes>;

export class jobs extends Model<jobsAttributes, jobsCreationAttributes> implements jobsAttributes {
  jobId!: number;
  shopId!: number;
  name!: string;
  api_url!: string;
  cookie?: string;
  lastRun?: Date;
  username?: string;
  password?: string;
  actived?: number;
  modifiedDatetime?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof jobs {
    return jobs.init({
    jobId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    shopId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    api_url: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    cookie: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    lastRun: {
      type: DataTypes.DATE,
      allowNull: true
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    actived: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    modifiedDatetime: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'jobs',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "jobId" },
        ]
      },
    ]
  });
  }
}
