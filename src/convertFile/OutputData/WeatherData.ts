import WeatherExcelConfig from "#/ExcelBinOutput/WeatherExcelConfig"
import WeatherTemplateExcelConfig from "#/ExcelBinOutput/WeatherTemplateExcelConfig"
import WeatherDataList, { WeatherTemplateData } from "$DT/WeatherData"
import Writer from "./writer"

export class WeatherDataWriter extends Writer {
  declare data: WeatherDataList

  constructor(ver: string) {
    super("WeatherData", ver)
  }

  async generateData(): Promise<void> {
    this.data = []

    const { version, data } = this

    const weatherExcelConfigLoader = WeatherExcelConfig(version)
    const weatherTemplateExcelConfigLoader = WeatherTemplateExcelConfig(version)

    await weatherExcelConfigLoader.load()
    await weatherTemplateExcelConfigLoader.load()

    const { data: weatherExcelConfig } = weatherExcelConfigLoader
    const { data: weatherTemplateExcelConfig } = weatherTemplateExcelConfigLoader

    for (const weather of weatherExcelConfig) {
      const {
        AreaID,
        WeatherAreaId,
        MaxHeightStr,
        TemplateName,
        Priority,
        ProfileName,
        DefaultClimate,
        SceneID,

        GadgetID,
        IsDefaultValid,
        IsUseDefault,
      } = weather

      const templates: WeatherTemplateData[] = weatherTemplateExcelConfig
        .filter((template) => template.TemplateName === TemplateName)
        .map((template) => ({
          WeatherType: template.WeatherType,

          SunnyProb: template.SunnyProb,
          CloudyProb: template.CloudyProb,
          RainProb: template.RainProb,
          ThunderstormProb: template.ThunderstormProb,
          SnowProb: template.SnowProb,
          MistProb: template.MistProb,
        }))

      data.push({
        AreaID,
        WeatherAreaId,
        MaxHeightStr,
        Templates: templates,
        Priority,
        ProfileName,
        DefaultClimate,
        SceneID,

        GadgetID,
        IsDefaultValid,
        IsUseDefault,
      })
    }
  }
}

export default (ver: string) => new WeatherDataWriter(ver)
