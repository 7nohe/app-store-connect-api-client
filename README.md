# @7nohe/app-store-connect-api-client

> App Store Connect API client for Node.js

## Install

```bash
$ npm install -D @7nohe/app-store-connect-api-client
```

## Usage

```ts
import { createClient, SalesReportFrequency } from '@7nohe/app-store-connect-api-client'
import path from 'path';

const privateKeyPath = path.resolve(__dirname, '/path/to/your/p8/file');

const client = createClient({
  apiKey: '<YOUR-API-KEY>',
  issuerId: '<YOUR-ISSUER-ID>',
  privateKey: {
    path: privateKeyPath
  }
})

const run = async () => {
  const result = await client.getSalesReports({
    vendorNumber: process.env.VENDOR_NUMBER!,
    reportDate: '2022-08-07',
    frequency: SalesReportFrequency.Weekly
  })
  console.log(result);
}

run();

```

For CI, a base64-encoded private key file can be set as an environment variable and passed as an option.

```ts
import { createClient } from '@7nohe/app-store-connect-api-client'
import * as dotenv from 'dotenv';
dotenv.config();

const client = createClient({
  apiKey: process.env.API_KEY!,
  issuerId: process.env.ISSUER_ID!,
  privateKey: Buffer.from(process.env.PRIVATE_KEY!, 'base64'),
})
```

[Here](https://github.com/7nohe/app-store-connect-slack-report-example) is an example of sending a sales report to Slack.


## API Documentation

Currently, only [Sales and Finance Reports](https://developer.apple.com/documentation/appstoreconnectapi/sales_and_finance_reports) APIs are available.

```ts
declare const createClient: (clientOptions: ClientOptions) => {
    getFinanceReports: (options: GetFinanceReportsOptions) => Promise<{
        Total_Rows?: string;
        Total_Amount?: string;
        Total_Units?: string;
        data: FinanceReportData[];
    }>;
    getSalesReports: (options: GetSalesReportsOptions) => Promise<SalesReportData[]>;
};
```