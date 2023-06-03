import GadgetExcelConfigList from "$DT/ExcelBinOutput/GadgetExcelConfig"
import Reader from "./reader"

export class GadgetExcelConfigReader extends Reader {
  declare data: GadgetExcelConfigList

  constructor(ver: string) {
    super("GadgetExcelConfigData", ver)
  }
}

export default (ver: string) => new GadgetExcelConfigReader(ver)
