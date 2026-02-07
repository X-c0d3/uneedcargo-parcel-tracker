import os from 'os';
import path from 'path';

const desktopDir = path.join(os.homedir(), 'Desktop');
const AppConfig = {
  API_URL: process.env.API_URL,
  USERNAME: process.env.USERNAME,
  ENABLE_LINE_NOTIFY: process.env.ENABLE_LINE_NOTIFY,
  LINE_TOKEN: process.env.LINE_TOKEN,
  CURRENCY: process.env.CURRENCY,
  EXCHANGE_RATE_USD: process.env.EXCHANGE_RATE_USD,
  COOKIE: process.env.COOKIE,
  DOWNLOAD_PATH: process.env.DEFAULT_TARGET_FOLDER ? process.env.DEFAULT_TARGET_FOLDER : `${desktopDir}/download`,
  DEFAULT_FILE_EXTENSTION: '.jpg',
};

enum DocumentTypeEnum {
  TAX = 1,
  RECEIPT = 2,
  QUOTATION = 3,
}

const HEADER = {
  timeout: 50000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    Accept: '*',
    Cache: 'no-cache',
    'Accept-Encoding': 'gzip, deflate, br',
    'accept-language': 'en-US,en;q=0.9,th-TH;q=0.8,th;q=0.7,zh-CN;q=0.6,zh;q=0.5',
    Connection: 'keep-alive',
    accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
    Cookie: AppConfig.COOKIE,
    withCredentials: true,
    rejectUnauthorized: false,
  },
};

const DBconfig = {
  MYSQL_HOST: process.env.MYSQL_HOST || '',
  MYSQL_DIALECT: process.env.MYSQL_DIALECT || 'mariadb',
  MYSQL_DB: process.env.MYSQL_DB || '',
  MYSQL_USERNAME: process.env.MYSQL_USERNAME || '',
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || '',
  MYSQL_PORT: process.env.MYSQL_PORT || 3307,
  MYSQL_TIMEOUT: process.env.MYSQL_TIMEOUT || 5000,
};

export { AppConfig, HEADER, DocumentTypeEnum, DBconfig };
