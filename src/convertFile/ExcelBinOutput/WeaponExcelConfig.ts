import WeaponExcelConfigList from "$DT/ExcelBinOutput/WeaponExcelConfig"
import Reader from "./reader"

export class WeaponExcelConfigReader extends Reader {
  declare data: WeaponExcelConfigList

  constructor(ver: string) {
    super("WeaponExcelConfigData", ver)
  }
}

export default (ver: string) => new WeaponExcelConfigReader(ver)
