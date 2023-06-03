import ReliquaryMainPropExcelConfigList from "$DT/ExcelBinOutput/ReliquaryMainPropExcelConfig"
import Reader from "./reader"

export class ReliquaryMainPropExcelConfigReader extends Reader {
  declare data: ReliquaryMainPropExcelConfigList

  constructor(ver: string) {
    super("ReliquaryMainPropExcelConfigData", ver)
  }
}

export default (ver: string) => new ReliquaryMainPropExcelConfigReader(ver)
