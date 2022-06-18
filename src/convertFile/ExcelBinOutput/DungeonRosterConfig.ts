import DungeonRosterConfigList from '#/types/ExcelBinOutput/DungeonRosterConfig'
import Reader from './reader'

export class DungeonRosterConfigReader extends Reader {
  declare data: DungeonRosterConfigList

  constructor(ver: string) {
    super('DungeonRosterConfigData', ver)
  }
}

export default (ver: string) => new DungeonRosterConfigReader(ver)