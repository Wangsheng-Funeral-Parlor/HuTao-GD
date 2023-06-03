import MaterialSourceDataExcelConfigList from "$DT/ExcelBinOutput/MaterialSourceDataExcelConfig"
import Reader from "./reader"

export class MaterialSourceDataExcelConfigReader extends Reader {
  declare data: MaterialSourceDataExcelConfigList

  constructor(ver: string) {
    super("MaterialSourceDataExcelConfigData", ver)
  }
}

export default (ver: string) => new MaterialSourceDataExcelConfigReader(ver)
