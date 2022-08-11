import zlib from 'zlib'
import csv from 'csv-parser'
import type { CSVRowData } from './types'

export const unzip = async (input: zlib.InputType) => {
  try {
    const buffer = await zlib.gunzipSync(input)
    return buffer
  }
  catch (e) {
    throw new Error(`Unable to unzip ${input}: ${e}`)
  }
}

export const parseCSV = <T = CSVRowData>(data: Buffer, encoding?: BufferEncoding): Promise<T[]> => {
  return new Promise<T[]>((resolve, reject) => {
    try {
      const rows: T[] = []
      const parser = csv({
        separator: '\t',
      })

      parser.once('error', (e) => {
        reject(e)
      })
        .once('end', () => {
          resolve(rows)
        })
        .on('readable', () => {
          try {
            let rowData = parser.read()
            while (rowData) {
              rows.push(rowData)
              rowData = parser.read()
            }
          }
          catch (e) {
            reject(e)
          }
        })

      parser.write(data, encoding)

      parser.end()
    }
    catch (e) {
      reject(e)
    }
  })
}
