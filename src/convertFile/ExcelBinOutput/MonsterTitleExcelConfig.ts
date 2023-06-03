import MonsterTitleExcelConfigList from "$DT/ExcelBinOutput/MonsterTitleExcelConfig"
import Reader from "./reader"

export class MonsterTitleExcelConfigReader extends Reader {
  declare data: MonsterTitleExcelConfigList

  constructor(ver: string) {
    super("MonsterTitleExcelConfigData", ver)
  }
}

export default (ver: string) => new MonsterTitleExcelConfigReader(ver)
