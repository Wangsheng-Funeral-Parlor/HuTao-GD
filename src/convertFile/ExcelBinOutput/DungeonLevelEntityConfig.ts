import DungeonLevelEntityConfigList from "$DT/ExcelBinOutput/DungeonLevelEntityConfig"
import Reader from "./reader"

export class DungeonLevelEntityConfigReader extends Reader {
  declare data: DungeonLevelEntityConfigList

  constructor(ver: string) {
    super("DungeonLevelEntityConfigData", ver)
  }
}

export default (ver: string) => new DungeonLevelEntityConfigReader(ver)
