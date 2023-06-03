import ReliquaryAffixExcelConfig from "#/ExcelBinOutput/ReliquaryAffixExcelConfig"
import ReliquaryExcelConfig from "#/ExcelBinOutput/ReliquaryExcelConfig"
import ReliquaryLevelExcelConfig from "#/ExcelBinOutput/ReliquaryLevelExcelConfig"
import ReliquaryMainPropExcelConfig from "#/ExcelBinOutput/ReliquaryMainPropExcelConfig"
import ReliquarySetExcelConfig from "#/ExcelBinOutput/ReliquarySetExcelConfig"
import ReliquaryDataGroup from "$DT/ReliquaryData"
import Writer from "./writer"

export class ReliquaryDataWriter extends Writer {
  declare data: ReliquaryDataGroup

  constructor(ver: string) {
    super("ReliquaryData", ver)
  }

  async generateData(): Promise<void> {
    this.data = {
      Reliquary: [],
      MainProp: [],
      Affix: [],
      Level: [],
      Set: [],
    }

    const { data, version } = this

    const reliquaryExcelConfigLoader = ReliquaryExcelConfig(version)
    const reliquaryMainPropExcelConfigLoader = ReliquaryMainPropExcelConfig(version)
    const reliquaryAffixExcelConfigLoader = ReliquaryAffixExcelConfig(version)
    const reliquaryLevelExcelConfigLoader = ReliquaryLevelExcelConfig(version)
    const reliquarySetExcelConfigLoader = ReliquarySetExcelConfig(version)

    await reliquaryExcelConfigLoader.load()
    await reliquaryMainPropExcelConfigLoader.load()
    await reliquaryAffixExcelConfigLoader.load()
    await reliquaryLevelExcelConfigLoader.load()
    await reliquarySetExcelConfigLoader.load()

    const { data: reliquaryExcelConfig } = reliquaryExcelConfigLoader
    const { data: reliquaryMainPropExcelConfig } = reliquaryMainPropExcelConfigLoader
    const { data: reliquaryAffixExcelConfig } = reliquaryAffixExcelConfigLoader
    const { data: reliquaryLevelExcelConfig } = reliquaryLevelExcelConfigLoader
    const { data: reliquarySetExcelConfig } = reliquarySetExcelConfigLoader

    for (const reliquary of reliquaryExcelConfig) {
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
        Dropable,
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
        Dropable,
      })
    }

    for (const reliquaryMainProp of reliquaryMainPropExcelConfig) {
      const { Id, PropDepotId, PropType, AffixName } = reliquaryMainProp

      data.MainProp.push({
        Id,
        PropDepotId,
        PropType,
        AffixName,
      })
    }

    for (const reliquaryAffix of reliquaryAffixExcelConfig) {
      const { Id, DepotId, GroupId, PropType, PropValue } = reliquaryAffix

      data.Affix.push({
        Id,
        DepotId,
        GroupId,
        PropType,
        PropValue,
      })
    }

    for (const reliquaryLevel of reliquaryLevelExcelConfig) {
      const {
        Level,
        AddProps,

        Rank,
        Exp,
      } = reliquaryLevel

      data.Level.push({
        Level,
        AddProps,

        Rank,
        Exp,
      })
    }

    for (const reliquarySet of reliquarySetExcelConfig) {
      const { SetId, SetNeedNum, ContainsList, EquipAffixId, DisableFilter } = reliquarySet

      data.Set.push({
        Id: SetId,
        SetNeedNum,
        ContainsList,
        EquipAffixId,
        DisableFilter,
      })
    }
  }
}

export default (ver: string) => new ReliquaryDataWriter(ver)
