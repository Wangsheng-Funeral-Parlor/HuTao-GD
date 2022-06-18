import MonsterExcelConfigList from '#/types/ExcelBinOutput/MonsterExcelConfig'
import Reader from './reader'

export class MonsterExcelConfigReader extends Reader {
  declare data: MonsterExcelConfigList

  constructor(ver: string) {
    super('MonsterExcelConfigData', ver)
  }
}

export default (ver: string) => new MonsterExcelConfigReader(ver)