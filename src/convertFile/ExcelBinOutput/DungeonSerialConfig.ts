import DungeonSerialConfigList from "$DT/ExcelBinOutput/DungeonSerialConfig"
import Reader from "./reader"

export class DungeonSerialConfigReader extends Reader {
  declare data: DungeonSerialConfigList

  constructor(ver: string) {
    super("DungeonSerialConfigData", ver)
  }
}

export default (ver: string) => new DungeonSerialConfigReader(ver)
