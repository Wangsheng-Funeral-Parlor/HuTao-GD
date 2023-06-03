import MonsterAffixExcelConfigList from "$DT/ExcelBinOutput/MonsterAffixExcelConfig"
import Reader from "./reader"

export class MonsterAffixExcelConfigReader extends Reader {
  declare data: MonsterAffixExcelConfigList

  constructor(ver: string) {
    super("MonsterAffixExcelConfigData", ver)
  }
}

export default (ver: string) => new MonsterAffixExcelConfigReader(ver)
