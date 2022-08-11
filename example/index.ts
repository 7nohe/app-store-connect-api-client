import { createClinet, SalesReportFrequency } from '../dist'
// import path from 'path';
import * as dotenv from 'dotenv';
dotenv.config();

// const privateKeyPath = path.resolve(__dirname, '../privateKey.p8');

const client = createClinet({
  apiKey: process.env.API_KEY!,
  issuerId: process.env.ISSUER_ID!,
  privateKey: Buffer.from(process.env.PRIVATE_KEY!, 'base64'),
  // you can also set the path of the private key
  // privateKey: {
  //   path: privateKeyPath
  // }
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
