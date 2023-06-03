import WorldExcelConfigList from "$DT/ExcelBinOutput/WordExcelConfig"
import Reader from "./reader"

export class WorldExcelConfigReader extends Reader {
  declare data: WorldExcelConfigList

  constructor(ver: string) {
    super("WorldExcelConfigData", ver)
  }
}

export default (ver: string) => new WorldExcelConfigReader(ver)
