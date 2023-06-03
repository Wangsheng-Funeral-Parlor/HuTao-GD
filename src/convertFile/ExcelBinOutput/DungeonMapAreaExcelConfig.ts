import DungeonMapAreaExcelConfigList from "$DT/ExcelBinOutput/DungeonMapAreaExcelConfig"
import Reader from "./reader"

export class DungeonMapAreaExcelConfigReader extends Reader {
  declare data: DungeonMapAreaExcelConfigList

  constructor(ver: string) {
    super("DungeonMapAreaExcelConfigData", ver)
  }
}

export default (ver: string) => new DungeonMapAreaExcelConfigReader(ver)
