import { readFileSync } from 'fs'
import { join } from 'path'
import { cwd } from 'process'

const getJson = (path: string, defValue: any = null) => {
  try {
    const data = JSON.parse(readFileSync(join(cwd(), path), 'utf8'))
    return Array.isArray(data) ? data : Object.assign({}, defValue, data)
  } catch (err) {
    return defValue
  }
}

export default getJson