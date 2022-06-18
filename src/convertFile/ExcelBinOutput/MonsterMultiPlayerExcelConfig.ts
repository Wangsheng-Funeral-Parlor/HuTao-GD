import MonsterMultiPlayerExcelConfigList from '#/types/ExcelBinOutput/MonsterMultiPlayerExcelConfig'
import Reader from './reader'

export class MonsterMultiPlayerExcelConfigReader extends Reader {
  declare data: MonsterMultiPlayerExcelConfigList

  constructor(ver: string) {
    super('MonsterMultiPlayerExcelConfigData', ver)
  }
}

export default (ver: string) => new MonsterMultiPlayerExcelConfigReader(ver)