import ConfigAvatar from "#/BinOutput/ConfigAvatar"
import AvatarCostumeExcelConfig from "#/ExcelBinOutput/AvatarCostumeExcelConfig"
import AvatarExcelConfig from "#/ExcelBinOutput/AvatarExcelConfig"
import AvatarFlycloakExcelConfig from "#/ExcelBinOutput/AvatarFlycloakExcelConfig"
import FetterInfoExcelConfig from "#/ExcelBinOutput/FetterInfoExcelConfig"
import FettersExcelConfig from "#/ExcelBinOutput/FettersExcelConfig"
import FetterStoryExcelConfig from "#/ExcelBinOutput/FetterStoryExcelConfig"
import AvatarDataGroup from "$DT/AvatarData"
import FetterConfig from "$DT/ExcelBinOutput/Common/FetterConfig"
import FetterDataList from "$DT/FetterData"
import Writer from "./writer"

function getFetterConfig(data: FetterConfig): FetterConfig {
  const { FetterId, AvatarId, OpenConds, FinishConds } = data

  return {
    FetterId,
    AvatarId,
    OpenConds,
    FinishConds,
  }
}

export class AvatarDataWriter extends Writer {
  declare data: AvatarDataGroup

  constructor(ver: string) {
    super("AvatarData", ver)
  }

  async generateData(): Promise<void> {
    this.data = {
      Avatar: [],
      Costume: [],
      Flycloak: [],
    }

    const { version, data } = this

    const configAvatarLoader = ConfigAvatar(version)
    const avatarExcelConfigLoader = AvatarExcelConfig(version)
    const fetterInfoExcelConfigLoader = FetterInfoExcelConfig(version)
    const fettersExcelConfigLoader = FettersExcelConfig(version)
    const fetterStoryExcelConfigLoader = FetterStoryExcelConfig(version)
    const avatarCostumeExcelConfigLoader = AvatarCostumeExcelConfig(version)
    const avatarFlycloakExcelConfigLoader = AvatarFlycloakExcelConfig(version)

    await configAvatarLoader.loadDir()
    await avatarExcelConfigLoader.load()
    await fetterInfoExcelConfigLoader.load()
    await fettersExcelConfigLoader.load()
    await fetterStoryExcelConfigLoader.load()
    await avatarCostumeExcelConfigLoader.load()
    await avatarFlycloakExcelConfigLoader.load()

    const { data: configAvatar } = configAvatarLoader
    const { data: avatarExcelConfig } = avatarExcelConfigLoader
    const { data: fetterInfoExcelConfig } = fetterInfoExcelConfigLoader
    const { data: fettersExcelConfig } = fettersExcelConfigLoader
    const { data: fetterStoryExcelConfig } = fetterStoryExcelConfigLoader
    const { data: avatarCostumeExcelConfig } = avatarCostumeExcelConfigLoader
    const { data: avatarFlycloakExcelConfig } = avatarFlycloakExcelConfigLoader

    for (const avatar of avatarExcelConfig) {
      const {
        UseType,
        BodyType,
        QualityType,
        WeaponType,

        Id,
        IconName,
        IsRangeAttack,
        InitialWeapon,
        GachaCardNameHashSuffix,
        GachaImageNameHashSuffix,
        SkillDepotId,
        CandSkillDepotIds,

        AvatarPromoteId,
        AvatarPromoteRewardLevelList,
        AvatarPromoteRewardIdList,

        HpBase,
        AttackBase,
        DefenseBase,
        Critical,
        CriticalHurt,
        StaminaRecoverSpeed,
        ChargeEfficiency,

        PropGrowCurves,
        CombatConfigHashSuffix,
        CombatConfigHashPre,
        PrefabPathHashSuffix,
        PrefabPathHashPre,
        PrefabPathRemoteHashSuffix,
        PrefabPathRemoteHashPre,
        ControllerPathHashSuffix,
        ControllerPathHashPre,
        ControllerPathRemoteHashSuffix,
        ControllerPathRemoteHashPre,
      } = avatar

      if (UseType == null) continue

      const name = (IconName.match(/(?<=^UI_AvatarIcon_).*$/) || [])[0]
      const avatarConfig = configAvatar[name]
      const fetters: FetterDataList = []

      fetters.push(
        ...fetterInfoExcelConfig.filter((f) => f.AvatarId === Id).map(getFetterConfig),
        ...fettersExcelConfig.filter((f) => f.AvatarId === Id).map(getFetterConfig),
        ...fetterStoryExcelConfig.filter((f) => f.AvatarId === Id).map(getFetterConfig)
      )

      data.Avatar.push({
        UseType,
        BodyType,
        QualityType,
        WeaponType,
        Id,
        Name: name,
        IsRangeAttack,
        InitialWeapon,
        GachaCardNameHashSuffix,
        GachaImageNameHashSuffix,
        SkillDepotId,
        CandSkillDepotIds,

        AvatarPromoteId,
        AvatarPromoteRewardLevelList,
        AvatarPromoteRewardIdList,

        HpBase,
        AttackBase,
        DefenseBase,
        Critical,
        CriticalHurt,
        StaminaRecoverSpeed,
        ChargeEfficiency,

        PropGrowCurves,
        CombatConfigHashSuffix,
        CombatConfigHashPre,
        PrefabPathHashSuffix,
        PrefabPathHashPre,
        PrefabPathRemoteHashSuffix,
        PrefabPathRemoteHashPre,
        ControllerPathHashSuffix,
        ControllerPathHashPre,
        ControllerPathRemoteHashSuffix,
        ControllerPathRemoteHashPre,

        Config: avatarConfig,
        Fetters: fetters,
      })
    }

    for (const costume of avatarCostumeExcelConfig) {
      data.Costume.push({
        Id: costume.CostumeId || costume.SkinId,
        AvatarId: costume.CharacterId || costume.AvatarId,
      })
    }

    for (const flycloak of avatarFlycloakExcelConfig) {
      data.Flycloak.push({
        Id: flycloak.FlycloakId,
      })
    }
  }
}

export default (ver: string) => new AvatarDataWriter(ver)
