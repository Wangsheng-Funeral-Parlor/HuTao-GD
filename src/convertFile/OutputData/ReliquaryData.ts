import ReliquaryAffixExcelConfig from '#/ExcelBinOutput/ReliquaryAffixExcelConfig'
import ReliquaryExcelConfig from '#/ExcelBinOutput/ReliquaryExcelConfig'
import ReliquaryLevelExcelConfig from '#/ExcelBinOutput/ReliquaryLevelExcelConfig'
import ReliquaryMainPropExcelConfig from '#/ExcelBinOutput/ReliquaryMainPropExcelConfig'
import ReliquaryDataGroup from '#/types/ReliquaryData'
import Writer from './writer'

export class ReliquaryDataWriter extends Writer {
  declare data: ReliquaryDataGroup

  constructor(ver: string) {
    super('ReliquaryData', ver)
  }

  async generateData(): Promise<void> {
    this.data = {
      Reliquary: [],
      MainProp: [],
      Affix: [],
      Level: []
    }

    const { data, version } = this

    const reliquaryExcelConfigLoader = ReliquaryExcelConfig(version)
    const reliquaryMainPropExcelConfigLoader = ReliquaryMainPropExcelConfig(version)
    const reliquaryAffixExcelConfigLoader = ReliquaryAffixExcelConfig(version)
    const reliquaryLevelExcelConfigLoader = ReliquaryLevelExcelConfig(version)

    await reliquaryExcelConfigLoader.load()
    await reliquaryMainPropExcelConfigLoader.load()
    await reliquaryAffixExcelConfigLoader.load()
    await reliquaryLevelExcelConfigLoader.load()

    const { data: reliquaryExcelConfig } = reliquaryExcelConfigLoader
    const { data: reliquaryMainPropExcelConfig } = reliquaryMainPropExcelConfigLoader
    const { data: reliquaryAffixExcelConfig } = reliquaryAffixExcelConfigLoader
    const { data: reliquaryLevelExcelConfig } = reliquaryLevelExcelConfigLoader

    for (let reliquary of reliquaryExcelConfig) {
      const {
        EquipType,
        RankLevel,
        MainPropDepotId,
        AppendPropDepotId,
        AddPropLevels,
        BaseConvExp,
        MaxLevel,
        DestroyReturnMaterial,
        DestroyReturnMaterialCount,
        Id,
        ItemType,
        Weight,
        Rank,
        GadgetId,

        AppendPropNum,
        SetId,
        StoryId,
        DestroyRule,
        Dropable
      } = reliquary

      data.Reliquary.push({
        EquipType,
        RankLevel,
        MainPropDepotId,
        AppendPropDepotId,
        AddPropLevels,
        BaseConvExp,
        MaxLevel,
        DestroyReturnMaterial,
        DestroyReturnMaterialCount,
        Id,
        ItemType,
        Weight,
        Rank,
        GadgetId,

        AppendPropNum,
        SetId,
        StoryId,
        DestroyRule,
        Dropable
      })
    }

    for (let reliquaryMainProp of reliquaryMainPropExcelConfig) {
      const {
        Id,
        PropDepotId,
        PropType,
        AffixName
      } = reliquaryMainProp

      data.MainProp.push({
        Id,
        PropDepotId,
        PropType,
        AffixName
      })
    }

    for (let reliquaryAffix of reliquaryAffixExcelConfig) {
      const {
        Id,
        DepotId,
        GroupId,
        PropType,
        PropValue
      } = reliquaryAffix

      data.Affix.push({
        Id,
        DepotId,
        GroupId,
        PropType,
        PropValue
      })
    }

    for (let reliquaryLevel of reliquaryLevelExcelConfig) {
      const {
        Level,
        AddProps,

        Rank,
        Exp
      } = reliquaryLevel

      data.Level.push({
        Level,
        AddProps,

        Rank,
        Exp
      })
    }
  }
}

export default (ver: string) => new ReliquaryDataWriter(ver)