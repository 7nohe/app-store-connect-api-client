# @7nohe/app-store-connect-api-client

> App Store Connect API client for Node.js

## Install

```bash
$ npm install -D @7nohe/app-store-connect-api-client
```

## Usage

```ts
import { createClinet, SalesReportFrequency } from '@7nohe/app-store-connect-api-client'
import path from 'path';

const privateKeyPath = path.resolve(__dirname, '/path/to/your/p8/file');

const client = createClinet({
  apiKey: '<YOUR-API-KEY>',
  issuerId: '<YOUR-ISSUER-ID>',
  privateKey: {
    path: privateKeyPath
  }
})

const run = async () => {
  const result = await client.getSalesReportSummary({
    vendorId: process.env.VENDOR_ID!,
    date: '2022-08-07',
    frequency: SalesReportFrequency.Weekly
  })
  console.log(result);
}

run();

```

For CI, a base64-encoded private key file can be set as an environment variable and passed as an option.

```ts
import { createClinet } from '@7nohe/app-store-connect-api-client'
import * as dotenv from 'dotenv';
dotenv.config();

const client = createClinet({
  apiKey: process.env.API_KEY!,
  issuerId: process.env.ISSUER_ID!,
  privateKey: Buffer.from(process.env.PRIVATE_KEY!, 'base64'),
})
```


