import WeatherTemplateExcelConfigList from '#/types/ExcelBinOutput/WeatherTemplateExcelConfig'
import Reader from './reader'

export class WeatherTemplateExcelConfigReader extends Reader {
  declare data: WeatherTemplateExcelConfigList

  constructor(ver: string) {
    super('WeatherTemplateExcelConfigData', ver)
  }
}

export default (ver: string) => new WeatherTemplateExcelConfigReader(ver)