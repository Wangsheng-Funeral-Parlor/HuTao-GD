import ReliquaryLevelExcelConfigList from "$DT/ExcelBinOutput/ReliquaryLevelExcelConfig"
import Reader from "./reader"

export class ReliquaryLevelExcelConfigReader extends Reader {
  declare data: ReliquaryLevelExcelConfigList

  constructor(ver: string) {
    super("ReliquaryLevelExcelConfigData", ver)
  }
}

export default (ver: string) => new ReliquaryLevelExcelConfigReader(ver)
