import type { SalesReportFrequency } from './enum'

export type ClientOptions = {
  apiKey: string;
  expriresIn?: number;
  issuerId: string;
  privateKey: Buffer | { path: string };
}

export type GetSalesReportsOptions = {
  reportDate?: string;
  vendorNumber: string;
  frequency?: SalesReportFrequency;
}

export type GetFinanceReportsOptions = {
  reportDate?: string;
  vendorNumber: string;
  regionCode: string;
}

export type CSVRowData = { [name: string]: string }

export type FinanceReportData = {
  'Start Date': string;
  'End Date': string;
  UPC: string;
  'ISRC/ISBN': string;
  'Vendor Identifier': string;
  Quantity: string;
  'Partner Share': string;
  'Extended Partner Share': string;
  'Partner Share Currency': string;
  'Sales or Return': string;
  'Apple Identifier': string;
  'Artist/Show/Developer/Author': string;
  Title: string;
  'Label/Studio/Network/Developer/Publisher': string;
  Grid: string;
  'Product Type Identifier': string;
  'ISAN/Other Identifier': string;
  'Country Of Sale': string;
  'Pre-order Flag': string;
  'Promo Code': string;
  'Customer Price': string;
  'Customer Currency': string;
}

export type SalesReportData = {
  Provider: string;
  'Provider Country': string;
  SKU: string;
  Developer: string;
  Title: string;
  Version: string;
  'Product Type Identifier': string;
  Units: string;
  'Developer Proceeds': string;
  'Begin Date': string;
  'End Date': string;
  'Customer Currency': string;
  'Country Code': string;
  'Currency of Proceeds': string;
  'Apple Identifier': string;
  'Customer Price': string;
  'Promo Code': string;
  'Parent Identifier': string;
  Subscription: string;
  Period: string;
  Category: string;
  CMB: string;
  Device: string;
  'Supported Platforms': string;
  'Proceeds Reason': string;
  'Preserved Pricing': string;
  Client: string;
  'Order Type': string;
}

