import MonsterSpecialNameExcelConfigList from "$DT/ExcelBinOutput/MonsterSpecialNameExcelConfig"
import Reader from "./reader"

export class MonsterSpecialNameExcelConfigReader extends Reader {
  declare data: MonsterSpecialNameExcelConfigList

  constructor(ver: string) {
    super("MonsterSpecialNameExcelConfigData", ver)
  }
}

export default (ver: string) => new MonsterSpecialNameExcelConfigReader(ver)
