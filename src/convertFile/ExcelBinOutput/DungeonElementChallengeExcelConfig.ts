import DungeonElementChallengeExcelConfigList from '#/types/ExcelBinOutput/DungeonElementChallengeExcelConfig'
import Reader from './reader'

export class DungeonElementChallengeExcelConfigReader extends Reader {
  declare data: DungeonElementChallengeExcelConfigList

  constructor(ver: string) {
    super('DungeonElementChallengeExcelConfigData', ver)
  }
}

export default (ver: string) => new DungeonElementChallengeExcelConfigReader(ver)