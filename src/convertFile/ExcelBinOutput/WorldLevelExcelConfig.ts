import WorldLevelExcelConfigList from "$DT/ExcelBinOutput/WorldLevelExcelConfig"
import Reader from "./reader"

export class WorldLevelExcelConfigReader extends Reader {
  declare data: WorldLevelExcelConfigList

  constructor(ver: string) {
    super("WorldLevelExcelConfigData", ver)
  }
}

export default (ver: string) => new WorldLevelExcelConfigReader(ver)
