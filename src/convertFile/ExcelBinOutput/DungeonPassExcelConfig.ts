import DungeonPassExcelConfigList from "$DT/ExcelBinOutput/DungeonPassExcelConfig"
import Reader from "./reader"

export class DungeonPassExcelConfigReader extends Reader {
  declare data: DungeonPassExcelConfigList

  constructor(ver: string) {
    super("DungeonPassExcelConfigData", ver)
  }
}

export default (ver: string) => new DungeonPassExcelConfigReader(ver)
