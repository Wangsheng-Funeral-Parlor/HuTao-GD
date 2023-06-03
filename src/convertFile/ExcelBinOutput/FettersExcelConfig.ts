import FettersExcelConfigList from "$DT/ExcelBinOutput/FettersExcelConfig"
import Reader from "./reader"

export class FettersExcelConfigReader extends Reader {
  declare data: FettersExcelConfigList

  constructor(ver: string) {
    super("FettersExcelConfigData", ver)
  }
}

export default (ver: string) => new FettersExcelConfigReader(ver)
