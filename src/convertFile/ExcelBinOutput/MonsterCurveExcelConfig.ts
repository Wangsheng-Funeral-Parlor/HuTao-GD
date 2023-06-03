import CurveExcelConfigList from "$DT/ExcelBinOutput/Common/CurveExcelConfig"
import Reader from "./reader"

export class MonsterCurveExcelConfigReader extends Reader {
  declare data: CurveExcelConfigList

  constructor(ver: string) {
    super("MonsterCurveExcelConfigData", ver)
  }
}

export default (ver: string) => new MonsterCurveExcelConfigReader(ver)
