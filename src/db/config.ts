import { Sequelize, Options, Op } from 'sequelize';
import { DBconfig } from '../constants/Constants';
import { initModels } from './models/init-models';
import util from 'util';

export const convertQueryToFilterParams = (params: URLSearchParams) => {
  const filters: any[] = [];

  for (const [key, value] of params.entries()) {
    const match = key.match(/^filters\[(\d+)\]\.(fieldName|fieldValue|filterType)$/);
    if (!match) continue;

    const index = Number(match[1]);
    const prop = match[2];

    if (!filters[index]) filters[index] = {};
    filters[index][prop] = decodeURIComponent(value);
  }

  if (filters.length === 0) return {};

  const results = filters.map((p) => {
    let fieldName = p.fieldName;
    fieldName = p.fieldName.includes('.') ? `$${p.fieldName}$` : fieldName;
    if (p.filterType === 'Equals') {
      return {
        [fieldName]: { [Op.eq]: p.fieldValue },
      };
    } else {
      return {
        [fieldName]: { [Op.like]: `%${p.fieldValue}%` },
      };
    }
  });

  return results.length > 0 ? { [Op.or]: results } : {};
};

export const debugWhere = (label: string, obj: any) => {
  console.log(label, util.inspect(obj, { depth: null, colors: true }));
};

const sequelize = new Sequelize(DBconfig.MYSQL_DB, DBconfig.MYSQL_USERNAME, DBconfig.MYSQL_PASSWORD, {
  host: DBconfig.MYSQL_HOST,
  dialect: DBconfig.MYSQL_DIALECT,
  port: DBconfig.MYSQL_PORT,
  dialectOptions: {
    connectTimeout: Number(DBconfig.MYSQL_TIMEOUT),
  },
  //operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    charset: 'utf8',
    // collate: 'utf8_general_ci',
  },
  logging: false,
} as Options);

const db = initModels(sequelize);
// Uncomment if you want to re-create tables
// sequelize.sync({ force: true });

db.invoices.hasMany(db.invoiceProducts, { foreignKey: 'invoiceId', as: 'items' });
db.invoices.hasOne(db.documentType, { foreignKey: 'documentTypeId', sourceKey: 'documentType', as: 'document' });
db.invoices.hasOne(db.userProfiles, { foreignKey: 'userId', sourceKey: 'modifiedUserId', as: 'modified' });

db.productImports.hasOne(db.transportType, { foreignKey: 'transportTypeId', sourceKey: 'transportTypeId', as: 'transport' });
db.productImports.hasOne(db.statusType, { foreignKey: 'statusTypeId', sourceKey: 'statusTypeId', as: 'status' });
db.productImports.hasOne(db.userProfiles, { foreignKey: 'userId', sourceKey: 'modifiedUserId', as: 'modified' });

db.products.hasMany(db.productImports, { foreignKey: 'productId', sourceKey: 'productId', as: 'imported' });
db.products.hasOne(db.productGroup, { foreignKey: 'groupId', sourceKey: 'groupId', as: 'productGroup' });
db.products.hasOne(db.userProfiles, { foreignKey: 'userId', sourceKey: 'modifiedUserId', as: 'modified' });
db.products.hasMany(db.productImages, { foreignKey: 'productId', as: 'images' });

db.productGroup.hasOne(db.userProfiles, { foreignKey: 'userId', sourceKey: 'modifiedUserId', as: 'modified' });

db.paymentTransactions.hasOne(db.sourceType, { foreignKey: 'sourceTypeId', sourceKey: 'sourceTypeId', as: 'source' });
db.paymentTransactions.hasOne(db.userProfiles, { foreignKey: 'userId', sourceKey: 'modifiedUserId', as: 'modified' });

db.settings.hasOne(db.userProfiles, { foreignKey: 'userId', sourceKey: 'modifiedUserId', as: 'modified' });

db.buyedTaxReports.hasOne(db.userProfiles, { foreignKey: 'userId', sourceKey: 'modifiedUserId', as: 'modified' });

db.bankAccount.hasOne(db.userProfiles, { foreignKey: 'userId', sourceKey: 'modifiedUserId', as: 'modified' });
db.paymentStatus.hasOne(db.userProfiles, { foreignKey: 'userId', sourceKey: 'modifiedUserId', as: 'modified' });
export default db;
