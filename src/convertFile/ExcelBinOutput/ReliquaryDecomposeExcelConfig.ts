import ReliquaryDecomposeExcelConfigList from "$DT/ExcelBinOutput/ReliquaryDecomposeExcelConfig"
import Reader from "./reader"

export class ReliquaryDecomposeExcelConfigReader extends Reader {
  declare data: ReliquaryDecomposeExcelConfigList

  constructor(ver: string) {
    super("ReliquaryDecomposeExcelConfigData", ver)
  }
}

export default (ver: string) => new ReliquaryDecomposeExcelConfigReader(ver)
