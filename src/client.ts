import fs from 'fs'
import dayjs from 'dayjs'
import jwt from 'jsonwebtoken'
import got from 'got'
import { SalesReportFrequency } from './enum'
import type { ClientOptions, GetSalesReportSummaryOptions, SalesReportData } from './types'
import { parseCSV, unzip } from './utils'

const getToken = (clientOptions: ClientOptions) => {
  const { issuerId: iss, expriresIn = 1000, apiKey, privateKey } = clientOptions
  const exp = Math.round((new Date()).getTime() / 1000) + expriresIn

  const payload = {
    iss,
    exp,
    aud: 'appstoreconnect-v1',
  }

  const signOptions: jwt.SignOptions = {
    algorithm: 'ES256',
    header: {
      alg: 'ES256',
      kid: apiKey,
      typ: 'JWT',
    },
  }

  const privateKeyData = Buffer.isBuffer(privateKey) ? privateKey : fs.readFileSync(privateKey.path)

  const token = jwt.sign(
    payload,
    privateKeyData,
    signOptions,
  )

  return token
}

export const createClinet = (clientOptions: ClientOptions) => {
  return {
    getSalesReportSummary: async (options: GetSalesReportSummaryOptions) => {
      let { date: reportDate } = options
      const { frequency = SalesReportFrequency.Weekly, vendorId } = options
      if (!reportDate)
        reportDate = dayjs().format('YYYY-MM-DD')

      if (!dayjs(reportDate, 'YYYY-MM-DD', true).isValid())
        throw new Error('Invalid report date. The input date must be `YYYY-MM-DD`.')

      const token = getToken(clientOptions)

      const response = await got.get('https://api.appstoreconnect.apple.com/v1/salesReports', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/a-gzip',
        },
        searchParams: {
          'filter[frequency]': frequency,
          'filter[reportDate]': reportDate,
          'filter[reportType]': 'SALES',
          'filter[reportSubType]': 'SUMMARY',
          'filter[vendorNumber]': vendorId,
        },
        responseType: 'buffer',
        throwHttpErrors: false,
      })

      if (!response.ok) {
        if (response.statusCode === 404)
          return []

        throw new Error(`Error Response(${response.statusCode
          }): '${response.body}'`)
      }

      const zip = response.body

      if (!zip) return []

      const unzipped = await unzip(zip)

      const allRows = await parseCSV<SalesReportData>(unzipped, 'utf8')

      return allRows
    },
  }
}
