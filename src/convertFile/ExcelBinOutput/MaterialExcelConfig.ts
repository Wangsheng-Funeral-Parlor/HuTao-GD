import MaterialExcelConfigList from "$DT/ExcelBinOutput/MaterialExcelConfig"
import Reader from "./reader"

export class MaterialExcelConfigReader extends Reader {
  declare data: MaterialExcelConfigList

  constructor(ver: string) {
    super("MaterialExcelConfigData", ver)
  }
}

export default (ver: string) => new MaterialExcelConfigReader(ver)
