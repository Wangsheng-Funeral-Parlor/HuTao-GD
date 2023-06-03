import WeaponLevelExcelConfigList from "$DT/ExcelBinOutput/WeaponLevelExcelConfig"
import Reader from "./reader"

export class WeaponLevelExcelConfigReader extends Reader {
  declare data: WeaponLevelExcelConfigList

  constructor(ver: string) {
    super("WeaponLevelExcelConfigData", ver)
  }
}

export default (ver: string) => new WeaponLevelExcelConfigReader(ver)
