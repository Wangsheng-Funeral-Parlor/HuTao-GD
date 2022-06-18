import DungeonExcelConfigList from '#/types/ExcelBinOutput/DungeonExcelConfig'
import Reader from './reader'

export class DungeonExcelConfigReader extends Reader {
  declare data: DungeonExcelConfigList

  constructor(ver: string) {
    super('DungeonExcelConfigData', ver)
  }
}

export default (ver: string) => new DungeonExcelConfigReader(ver)