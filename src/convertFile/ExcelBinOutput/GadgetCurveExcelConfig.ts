import CurveExcelConfigList from "$DT/ExcelBinOutput/Common/CurveExcelConfig"
import Reader from "./reader"

export class GadgetCurveExcelConfigReader extends Reader {
  declare data: CurveExcelConfigList

  constructor(ver: string) {
    super("GadgetCurveExcelConfigData", ver)
  }
}

export default (ver: string) => new GadgetCurveExcelConfigReader(ver)
