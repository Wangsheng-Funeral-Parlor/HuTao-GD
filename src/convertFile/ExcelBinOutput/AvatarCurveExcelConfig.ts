import CurveExcelConfigList from "$DT/ExcelBinOutput/Common/CurveExcelConfig"
import Reader from "./reader"

export class AvatarCurveExcelConfigReader extends Reader {
  declare data: CurveExcelConfigList

  constructor(ver: string) {
    super("AvatarCurveExcelConfigData", ver)
  }
}

export default (ver: string) => new AvatarCurveExcelConfigReader(ver)
