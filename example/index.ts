import { createClient, SalesReportFrequency } from '../dist'
// import path from 'path';
import * as dotenv from 'dotenv';
dotenv.config();

// const privateKeyPath = path.resolve(__dirname, '../privateKey.p8');

const client = createClient({
  apiKey: process.env.API_KEY!,
  issuerId: process.env.ISSUER_ID!,
  privateKey: Buffer.from(process.env.PRIVATE_KEY!, 'base64'),
  // you can also set the path of the private key
  // privateKey: {
  //   path: privateKeyPath
  // }
})

const run = async () => {
  const salesReports = await client.getSalesReports({
    vendorNumber: process.env.VENDOR_NUMBER!,
    reportDate: '2022-08-07',
    frequency: SalesReportFrequency.Weekly
  })
  console.log('--- Sales and Trends Reports ---');
  console.log(salesReports)
  console.log('--------------------------------')


  const financeReports = await client.getFinanceReports({
    vendorNumber: process.env.VENDOR_NUMBER!,
    reportDate: '2022-07',
    regionCode: "JP"
  })
  console.log('--- Finance Reports ---');
  console.log(financeReports)
  console.log('-----------------------')

}

run();
