import DungeonEntryExcelConfigList from "$DT/ExcelBinOutput/DungeonEntryExcelConfig"
import Reader from "./reader"

export class DungeonEntryExcelConfigReader extends Reader {
  declare data: DungeonEntryExcelConfigList

  constructor(ver: string) {
    super("DungeonEntryExcelConfigData", ver)
  }
}

export default (ver: string) => new DungeonEntryExcelConfigReader(ver)
