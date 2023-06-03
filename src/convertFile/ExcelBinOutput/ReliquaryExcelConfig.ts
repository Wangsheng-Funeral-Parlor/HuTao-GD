import ReliquaryExcelConfigList from "$DT/ExcelBinOutput/ReliquaryExcelConfig"
import Reader from "./reader"

export class ReliquaryExcelConfigReader extends Reader {
  declare data: ReliquaryExcelConfigList

  constructor(ver: string) {
    super("ReliquaryExcelConfigData", ver)
  }
}

export default (ver: string) => new ReliquaryExcelConfigReader(ver)
