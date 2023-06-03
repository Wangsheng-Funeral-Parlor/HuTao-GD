import WeatherExcelConfigList from "$DT/ExcelBinOutput/WeatherExcelConfig"
import Reader from "./reader"

export class WeatherExcelConfigReader extends Reader {
  declare data: WeatherExcelConfigList

  constructor(ver: string) {
    super("WeatherExcelConfigData", ver)
  }
}

export default (ver: string) => new WeatherExcelConfigReader(ver)
