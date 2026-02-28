import { google } from 'googleapis';
import readline from 'readline';
import { AppConfig } from '../constants/Constants';

const rl = readline.createInterface(process.stdin, process.stdout);

const spreadsheetId = AppConfig.GOOGLESHEET_ID;

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: AppConfig.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: AppConfig.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: 'https://www.googleapis.com/auth/spreadsheets',
});

const sheets = google.sheets({ version: 'v4', auth });

const getIncomeSummary = async (range: string) => {
  const stockData = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: range,
  });

  const results = [];
  let year = 0;
  const rows = stockData.data?.values;
  if (rows) {
    for (let i = 0; i < rows.length; i++) {
      const data = rows[i];
      const acYear = data[0];
      if (acYear && acYear !== 'รวม') {
        year = parseInt(acYear);
      }

      results.push({
        year: year,
        month: data[1],
        shopee: data[2],
        lazada: data[3],
        tiktok: data[4],
        nocnoc: data[5],
        shopee2: data[6],
        lazada2: data[7],
        other: data[8],
        summary: data[9],
        grow: data[10],
      });
    }
  }

  return results;
};

export { getIncomeSummary };
