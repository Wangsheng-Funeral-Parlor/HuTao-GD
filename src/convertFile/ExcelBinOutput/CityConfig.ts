import CityConfigList from "$DT/ExcelBinOutput/CityConfig"
import Reader from "./reader"

export class CityConfigReader extends Reader {
  declare data: CityConfigList

  constructor(ver: string) {
    super("CityConfigData", ver)
  }
}

export default (ver: string) => new CityConfigReader(ver)
