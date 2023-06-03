import WeaponExcelConfig from "#/ExcelBinOutput/WeaponExcelConfig"
import WeaponLevelExcelConfig from "#/ExcelBinOutput/WeaponLevelExcelConfig"
import WeaponPromoteExcelConfig from "#/ExcelBinOutput/WeaponPromoteExcelConfig"
import WeaponDataGroup from "$DT/WeaponData"
import Writer from "./writer"

export class WeaponDataWriter extends Writer {
  declare data: WeaponDataGroup

  constructor(ver: string) {
    super("WeaponData", ver)
  }

  async generateData(): Promise<void> {
    this.data = {
      Weapon: [],
      Level: [],
      Promote: [],
    }

    const { data, version } = this

    const weaponExcelConfigLoader = WeaponExcelConfig(version)
    const weaponLevelExcelConfigLoader = WeaponLevelExcelConfig(version)
    const weaponPromoteExcelConfigLoader = WeaponPromoteExcelConfig(version)

    await weaponExcelConfigLoader.load()
    await weaponLevelExcelConfigLoader.load()
    await weaponPromoteExcelConfigLoader.load()

    const { data: weaponExcelConfig } = weaponExcelConfigLoader
    const { data: weaponLevelExcelConfig } = weaponLevelExcelConfigLoader
    const { data: weaponPromoteExcelConfig } = weaponPromoteExcelConfigLoader

    for (const weapon of weaponExcelConfig) {
      const {
        WeaponType,
        RankLevel,
        WeaponBaseExp,
        SkillAffix,
        WeaponProp,
        WeaponPromoteId,
        AwakenCosts,
        GachaCardNameHashSuffix,
        GachaCardNameHashPre,
        DestroyReturnMaterial,
        DestroyReturnMaterialCount,
        Id,
        ItemType,
        Weight,
        Rank,
        GadgetId,
        UnRotate,

        DestroyRule,
        InitialLockState,
        AwakenMaterial,
        EnhanceRule,
      } = weapon

      data.Weapon.push({
        Type: WeaponType,
        RankLevel,
        BaseExp: WeaponBaseExp,
        SkillAffix,
        Prop: WeaponProp,
        PromoteId: WeaponPromoteId,
        AwakenCosts,
        GachaCardNameHashSuffix,
        GachaCardNameHashPre,
        DestroyReturnMaterial,
        DestroyReturnMaterialCount,
        Id,
        ItemType,
        Weight,
        Rank,
        GadgetId,
        UnRotate: !!UnRotate,

        DestroyRule,
        InitialLockState,
        AwakenMaterial,
        EnhanceRule,
      })
    }

    for (const weaponLevel of weaponLevelExcelConfig) {
      const { Level, RequiredExps } = weaponLevel

      data.Level.push({
        Level,
        RequiredExps,
      })
    }

    for (const weaponPromote of weaponPromoteExcelConfig) {
      const {
        WeaponPromoteId,
        CostItems,
        AddProps,
        UnlockMaxLevel,

        PromoteLevel,
        RequiredPlayerLevel,
        CoinCost,
      } = weaponPromote

      data.Promote.push({
        Id: WeaponPromoteId,
        CostItems: CostItems.filter((item) => item.Id != null) as { Id: number; Count: number }[],
        AddProps,
        UnlockMaxLevel,

        PromoteLevel,
        RequiredPlayerLevel,
        CoinCost,
      })
    }
  }
}

export default (ver: string) => new WeaponDataWriter(ver)
