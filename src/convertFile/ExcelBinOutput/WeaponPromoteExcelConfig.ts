import WeaponPromoteExcelConfigList from "$DT/ExcelBinOutput/WeaponPromoteExcelConfig"
import Reader from "./reader"

export class WeaponPromoteExcelConfigReader extends Reader {
  declare data: WeaponPromoteExcelConfigList

  constructor(ver: string) {
    super("WeaponPromoteExcelConfigData", ver)
  }
}

export default (ver: string) => new WeaponPromoteExcelConfigReader(ver)
