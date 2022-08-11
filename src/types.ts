import type { SalesReportFrequency } from './enum'

export type ClientOptions = {
  apiKey: string;
  expriresIn?: number;
  issuerId: string;
  privateKey: Buffer | { path: string };
}

export type GetSalesReportSummaryOptions = {
  date?: string;
  frequency?: SalesReportFrequency;
  vendorId: string;
}

export type CSVRowData = { [name: string]: string }

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

