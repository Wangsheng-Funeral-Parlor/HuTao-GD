import ConfigGadget from "#/BinOutput/ConfigGadget"
import GadgetExcelConfig from "#/ExcelBinOutput/GadgetExcelConfig"
import GadgetPropExcelConfig from "#/ExcelBinOutput/GadgetPropExcelConfig"
import GadgetDataList from "$DT/GadgetData"
import Writer from "./writer"

export class GadgetDataWriter extends Writer {
  declare data: GadgetDataList

  constructor(ver: string) {
    super("GadgetData", ver)
  }

  async generateData(): Promise<void> {
    this.data = {
      Gadget: [],
      Prop: [],
    }

    const { data, version } = this

    const configGadgetLoader = ConfigGadget(version)
    const gadgetExcelConfigLoader = GadgetExcelConfig(version)
    const gadgetPropExcelConfigLoader = GadgetPropExcelConfig(version)

    await configGadgetLoader.loadDir()
    await gadgetExcelConfigLoader.load()
    await gadgetPropExcelConfigLoader.load()

    const { data: configGadget } = configGadgetLoader
    const { data: gadgetExcelConfig } = gadgetExcelConfigLoader
    const { data: gadgetPropExcelConfig } = gadgetPropExcelConfigLoader

    for (const gadget of gadgetExcelConfig) {
      const {
        Id,
        Tags,
        JsonName,
        HasMove,
        HasAudio,
        IsInteractive,
        IsEquip,
        HasDynamicBarrier,
        Type,
        CampID,
        VisionLevel,
        MpPropID,
        LandSoundID,
        RadarHintID,
        ChainId,
        PrefabPathHashSuffix,
        PrefabPathHashPre,
        ItemPrefabPathHashSuffix,
        ItemPrefabPathHashPre,
        ClientScriptHashSuffix,
        ClientScriptHashPre,
        PrefabPathRemoteHashSuffix,
        PrefabPathRemoteHashPre,
        ControllerPathHashSuffix,
        ControllerPathHashPre,
      } = gadget

      const gadgetConfig = Object.values(configGadget).find((config) => config?.[JsonName] != null)?.[JsonName]

      data.Gadget.push({
        Id,
        Tags: Tags || [],
        JsonName,

        HasMove: !!HasMove,
        HasAudio: !!HasAudio,
        IsInteractive: !!IsInteractive,
        IsEquip: !!IsEquip,
        HasDynamicBarrier: !!HasDynamicBarrier,

        Type,
        CampID,
        VisionLevel,
        MpPropID,
        LandSoundID,
        RadarHintID,
        ChainId,

        PrefabPathHashSuffix,
        PrefabPathHashPre,
        ItemPrefabPathHashSuffix,
        ItemPrefabPathHashPre,
        ClientScriptHashSuffix,
        ClientScriptHashPre,
        PrefabPathRemoteHashSuffix,
        PrefabPathRemoteHashPre,
        ControllerPathHashSuffix,
        ControllerPathHashPre,

        Config: gadgetConfig,
      })
    }

    for (const gadgetProp of gadgetPropExcelConfig) {
      const { Id, Hp, Attack, Defense, HpCurve, AttackCurve, DefenseCurve } = gadgetProp

      data.Prop.push({
        Id,
        Hp,
        Attack: Attack || 0,
        Defense: Defense || 0,
        HpCurve,
        AttackCurve,
        DefenseCurve,
      })
    }
  }
}

export default (ver: string) => new GadgetDataWriter(ver)
