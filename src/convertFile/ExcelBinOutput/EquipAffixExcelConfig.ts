import EquipAffixExcelConfigList from "$DT/ExcelBinOutput/EquipAffixExcelConfig"
import Reader from "./reader"

export class EquipAffixExcelConfigReader extends Reader {
  declare data: EquipAffixExcelConfigList

  constructor(ver: string) {
    super("EquipAffixExcelConfigData", ver)
  }
}

export default (ver: string) => new EquipAffixExcelConfigReader(ver)
