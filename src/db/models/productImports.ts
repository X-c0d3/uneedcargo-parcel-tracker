import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { products, productsId } from './products';
import type { statusType, statusTypeId } from './statusType';
import type { transportType, transportTypeId } from './transportType';
import type { userProfiles, userProfilesId } from './userProfiles';

export interface productImportsAttributes {
  importeId: number;
  productId: number;
  transportTypeId: number;
  priceCNY?: number;
  quantity: number;
  totalPriceCNY?: number;
  shippingCost?: number;
  transportCost?: number;
  externalPrice?: number;
  exchangeRate?: number;
  markupPrice: number;
  sellingPrice: number;
  statusTypeId: number;
  orderNo?: string;
  trackingNo?: string;
  attempt?: number;
  url?: string;
  noted?: string;
  isDeleted: number;
  createdDatetime: Date;
  modifiedDatetime?: Date;
  modifiedUserId: number;
  shopId: string;
}

export type productImportsPk = "importeId";
export type productImportsId = productImports[productImportsPk];
export type productImportsOptionalAttributes = "importeId" | "priceCNY" | "quantity" | "totalPriceCNY" | "shippingCost" | "transportCost" | "externalPrice" | "exchangeRate" | "markupPrice" | "sellingPrice" | "statusTypeId" | "orderNo" | "trackingNo" | "attempt" | "url" | "noted" | "isDeleted" | "createdDatetime" | "modifiedDatetime";
export type productImportsCreationAttributes = Optional<productImportsAttributes, productImportsOptionalAttributes>;

export class productImports extends Model<productImportsAttributes, productImportsCreationAttributes> implements productImportsAttributes {
  importeId!: number;
  productId!: number;
  transportTypeId!: number;
  priceCNY?: number;
  quantity!: number;
  totalPriceCNY?: number;
  shippingCost?: number;
  transportCost?: number;
  externalPrice?: number;
  exchangeRate?: number;
  markupPrice!: number;
  sellingPrice!: number;
  statusTypeId!: number;
  orderNo?: string;
  trackingNo?: string;
  attempt?: number;
  url?: string;
  noted?: string;
  isDeleted!: number;
  createdDatetime!: Date;
  modifiedDatetime?: Date;
  modifiedUserId!: number;
  shopId!: string;

  // productImports belongsTo products via productId
  product!: products;
  getProduct!: Sequelize.BelongsToGetAssociationMixin<products>;
  setProduct!: Sequelize.BelongsToSetAssociationMixin<products, productsId>;
  createProduct!: Sequelize.BelongsToCreateAssociationMixin<products>;
  // productImports belongsTo statusType via statusTypeId
  statusType!: statusType;
  getStatusType!: Sequelize.BelongsToGetAssociationMixin<statusType>;
  setStatusType!: Sequelize.BelongsToSetAssociationMixin<statusType, statusTypeId>;
  createStatusType!: Sequelize.BelongsToCreateAssociationMixin<statusType>;
  // productImports belongsTo transportType via transportTypeId
  transportType!: transportType;
  getTransportType!: Sequelize.BelongsToGetAssociationMixin<transportType>;
  setTransportType!: Sequelize.BelongsToSetAssociationMixin<transportType, transportTypeId>;
  createTransportType!: Sequelize.BelongsToCreateAssociationMixin<transportType>;
  // productImports belongsTo userProfiles via modifiedUserId
  modifiedUser!: userProfiles;
  getModifiedUser!: Sequelize.BelongsToGetAssociationMixin<userProfiles>;
  setModifiedUser!: Sequelize.BelongsToSetAssociationMixin<userProfiles, userProfilesId>;
  createModifiedUser!: Sequelize.BelongsToCreateAssociationMixin<userProfiles>;

  static initModel(sequelize: Sequelize.Sequelize): typeof productImports {
    return productImports.init({
    importeId: {
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
    transportTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "ประเภทการขนส่ง",
      references: {
        model: 'transportType',
        key: 'transportTypeId'
      }
    },
    priceCNY: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: true,
      comment: "ราคาในจีน (CNY)"
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "จำนวน"
    },
    totalPriceCNY: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: true,
      comment: "ราคาสินค้ารวม ในจีน (CNY)"
    },
    shippingCost: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: true,
      defaultValue: 0.00,
      comment: "ค่านำเข้ามาไทย"
    },
    transportCost: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: true,
      comment: "ค่าส่งในไทย"
    },
    externalPrice: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: true
    },
    exchangeRate: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: true,
      comment: "อัตราแลกเปลี่ยน"
    },
    markupPrice: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: false,
      defaultValue: 0.00,
      comment: "ค่า packing สินค้า"
    },
    sellingPrice: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: false,
      defaultValue: 0.00,
      comment: "ราคาขาย"
    },
    statusTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: "สถานะ",
      references: {
        model: 'statusType',
        key: 'statusTypeId'
      }
    },
    orderNo: {
      type: DataTypes.STRING(150),
      allowNull: true,
      comment: "เลขคำสั่งชื้อ"
    },
    trackingNo: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    attempt: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    url: {
      type: DataTypes.STRING(1000),
      allowNull: true
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
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'productImports',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "importeId" },
        ]
      },
      {
        name: "productImports_products_FK",
        using: "BTREE",
        fields: [
          { name: "productId" },
        ]
      },
      {
        name: "productImports_statusType_FK",
        using: "BTREE",
        fields: [
          { name: "statusTypeId" },
        ]
      },
      {
        name: "productImports_transportType_FK",
        using: "BTREE",
        fields: [
          { name: "transportTypeId" },
        ]
      },
      {
        name: "productImports_userProfiles_FK",
        using: "BTREE",
        fields: [
          { name: "modifiedUserId" },
        ]
      },
    ]
  });
  }
}
