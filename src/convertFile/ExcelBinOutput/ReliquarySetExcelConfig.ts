import ReliquarySetExcelConfigList from "$DT/ExcelBinOutput/ReliquarySetExcelConfig"
import Reader from "./reader"

export class ReliquarySetExcelConfigReader extends Reader {
  declare data: ReliquarySetExcelConfigList

  constructor(ver: string) {
    super("ReliquarySetExcelConfigData", ver)
  }
}

export default (ver: string) => new ReliquarySetExcelConfigReader(ver)
