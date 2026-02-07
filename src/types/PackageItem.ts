export interface PackageItem {
  parcelNumber: string;
  lot: string;
  paymentStatus: string;
  productType: string;
  warehouseEntryDate: string;
  warehouseExitDate: string;
  arrivalDate: string;
  weightKg: number | null;
  volumeCbm: number | null;
  countedQuantity: number | null;
  boxCount: number | null;
  others: number | null;
  pricePerKg: number | null;
  pricePerCbm: number | null;
}

export const columnMapping: Record<string, keyof PackageItem> = {
  พัสดุ: 'parcelNumber',
  ล๊อตสินค้า: 'lot',
  ชำระเงินค่าสินค้า: 'paymentStatus',
  ประเภทสินค้า: 'productType',
  เข้าโกดัง: 'warehouseEntryDate',
  ออกโกดัง: 'warehouseExitDate',
  ถึงไทย: 'arrivalDate',
  กิโล: 'weightKg',
  'คิว.': 'volumeCbm',
  นับจำนวน: 'countedQuantity',
  ตีลัง: 'boxCount',
  อื่นๆ: 'others',
  ราคากิโล: 'pricePerKg',
  ราคาคิว: 'pricePerCbm',
};
