import ConfigTalentAvatar from "#/BinOutput/ConfigTalentAvatar"
import ConfigTalentEquip from "#/BinOutput/ConfigTalentEquip"
import ConfigTalentRelic from "#/BinOutput/ConfigTalentRelic"
import ConfigTalentTeam from "#/BinOutput/ConfigTalentTeam"
import AvatarTalentExcelConfig from "#/ExcelBinOutput/AvatarTalentExcelConfig"
import EquipAffixExcelConfig from "#/ExcelBinOutput/EquipAffixExcelConfig"
import TeamResonanceExcelConfig from "#/ExcelBinOutput/TeamResonanceExcelConfig"
import TalentDataGroup from "$DT/TalentData"
import Writer from "./writer"

export class TalentDataWriter extends Writer {
  declare data: TalentDataGroup

  constructor(ver: string) {
    super("TalentData", ver)
  }

  async generateData(): Promise<void> {
    this.data = {
      Avatar: [],
      Equip: [],
      Team: [],
    }

    const { version, data } = this

    const configTalentAvatarLoader = ConfigTalentAvatar(version)
    const configTalentEquipLoader = ConfigTalentEquip(version)
    const configTalentRelicLoader = ConfigTalentRelic(version)
    const configTalentTeamLoader = ConfigTalentTeam(version)
    const avatarTalentExcelConfigLoader = AvatarTalentExcelConfig(version)
    const equipAffixExcelConfigLoader = EquipAffixExcelConfig(version)
    const teamResonanceExcelConfigLoader = TeamResonanceExcelConfig(version)

    await configTalentAvatarLoader.loadDir()
    await configTalentEquipLoader.loadDir()
    await configTalentRelicLoader.loadDir()
    await configTalentTeamLoader.loadDir()
    await avatarTalentExcelConfigLoader.load()
    await equipAffixExcelConfigLoader.load()
    await teamResonanceExcelConfigLoader.load()

    const { data: configTalentAvatar } = configTalentAvatarLoader
    const { data: configTalentEquip } = configTalentEquipLoader
    const { data: configTalentRelic } = configTalentRelicLoader
    const { data: configTalentTeam } = configTalentTeamLoader
    const { data: avatarTalentExcelConfig } = avatarTalentExcelConfigLoader
    const { data: equipAffixExcelConfig } = equipAffixExcelConfigLoader
    const { data: teamResonanceExcelConfig } = teamResonanceExcelConfigLoader

    for (const avatarTalent of avatarTalentExcelConfig) {
      const {
        TalentId,
        MainCostItemId,
        MainCostItemCount,
        OpenConfig,
        AddProps,
        ParamList,

        PrevTalent,
      } = avatarTalent

      const talentConfig = configTalentAvatar[OpenConfig]

      data.Avatar.push({
        Id: TalentId,
        Name: OpenConfig,
        MainCostItemId,
        MainCostItemCount,
        AddProps,
        ParamList,
        Config: talentConfig,

        PrevTalent,
      })
    }

    for (const equipTalent of equipAffixExcelConfig) {
      const {
        AffixId,
        Id,
        NameTextMapHash,
        DescTextMapHash,
        OpenConfig,
        AddProps,
        ParamList,

        Level,
      } = equipTalent

      const talentConfig = configTalentEquip[OpenConfig] || configTalentRelic[OpenConfig]

      data.Equip.push({
        AffixId,
        Id,
        Name: OpenConfig,
        NameTextMapHash,
        DescTextMapHash,
        AddProps,
        ParamList,
        Config: talentConfig,

        Level,
      })
    }

    for (const teamTalent of teamResonanceExcelConfig) {
      const {
        TeamResonanceId,
        TeamResonanceGroupId,
        Level,
        NameTextMapHash,
        DescTextMapHash,
        OpenConfig,
        AddProps,
        ParamList,

        FireAvatarCount,
        WaterAvatarCount,
        WindAvatarCount,
        ElectricAvatarCount,
        GrassAvatarCount,
        IceAvatarCount,
        RockAvatarCount,
        Cond,
      } = teamTalent

      const talentConfig = configTalentTeam[OpenConfig]

      data.Team.push({
        TeamResonanceId,
        TeamResonanceGroupId,
        Name: OpenConfig,
        Level,
        NameTextMapHash,
        DescTextMapHash,
        AddProps,
        ParamList,
        Config: talentConfig,

        FireAvatarCount,
        WaterAvatarCount,
        WindAvatarCount,
        ElectricAvatarCount,
        GrassAvatarCount,
        IceAvatarCount,
        RockAvatarCount,
        Cond,
      })
    }
  }
}

export default (ver: string) => new TalentDataWriter(ver)
