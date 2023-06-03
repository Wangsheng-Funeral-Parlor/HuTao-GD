import CurveExcelConfigList from "$DT/ExcelBinOutput/Common/CurveExcelConfig"
import Reader from "./reader"

export class WeaponCurveExcelConfigReader extends Reader {
  declare data: CurveExcelConfigList

  constructor(ver: string) {
    super("WeaponCurveExcelConfigData", ver)
  }
}

export default (ver: string) => new WeaponCurveExcelConfigReader(ver)
