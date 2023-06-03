import MaterialExcelConfig from "#/ExcelBinOutput/MaterialExcelConfig"
import MaterialDataList from "$DT/MaterialData"
import Writer from "./writer"

export class MaterialDataWriter extends Writer {
  declare data: MaterialDataList

  constructor(ver: string) {
    super("MaterialData", ver)
  }

  async generateData(): Promise<void> {
    const { version } = this

    const materialExcelConfigLoader = MaterialExcelConfig(version)

    await materialExcelConfigLoader.load()

    this.data = materialExcelConfigLoader.data.map((material) => ({
      ItemUse: material.ItemUse,
      SatiationParams: material.SatiationParams,
      DestroyReturnMaterial: material.DestroyReturnMaterial,
      DestroyReturnMaterialCount: material.DestroyReturnMaterialCount,
      Id: material.Id,
      ItemType: material.ItemType,
      NoFirstGetHint: !!material.NoFirstGetHint,
      IsForceGetHint: !!material.IsForceGetHint,
      UseOnGain: !!material.UseOnGain,
      IsSplitDrop: !!material.IsSplitDrop,
      CloseBagAfterUsed: !!material.CloseBagAfterUsed,
      PlayGainEffect: !!material.PlayGainEffect,
      IsHidden: !!material.IsHidden,

      RankLevel: material.RankLevel,
      Rank: material.Rank,
      EffectGadgetID: material.EffectGadgetID,
      MaterialType: material.MaterialType,
      GadgetId: material.GadgetId,
      StackLimit: material.StackLimit,
      MaxUseCount: material.MaxUseCount,
      UseTarget: material.UseTarget,
      UseLevel: material.UseLevel,
      DestroyRule: material.DestroyRule,
      Weight: material.Weight,
      SetID: material.SetID,
      FoodQuality: material.FoodQuality,
      GlobalItemLimit: material.GlobalItemLimit,
      CdTime: material.CdTime,
      CdGroup: material.CdGroup,
    }))
  }
}

export default (ver: string) => new MaterialDataWriter(ver)
