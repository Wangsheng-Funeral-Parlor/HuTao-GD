import AvatarSkillDepotExcelConfig from '#/ExcelBinOutput/AvatarSkillDepotExcelConfig'
import AvatarSkillExcelConfig from '#/ExcelBinOutput/AvatarSkillExcelConfig'
import AvatarTalentExcelConfig from '#/ExcelBinOutput/AvatarTalentExcelConfig'
import ProudSkillExcelConfig from '#/ExcelBinOutput/ProudSkillExcelConfig'
import SkillDataList from '$DT/SkillData'
import Writer from './writer'

export class SkillDataWriter extends Writer {
  declare data: SkillDataList

  constructor(ver: string) {
    super('SkillData', ver)
  }

  async generateData(): Promise<void> {
    this.data = {
      Depot: [],
      Skill: [],
      ProudSkill: [],
      Talent: []
    }

    const { version, data } = this

    const avatarSkillDepotExcelConfigLoader = AvatarSkillDepotExcelConfig(version)
    const avatarSkillExcelConfigLoader = AvatarSkillExcelConfig(version)
    const proudSkillExcelConfigLoader = ProudSkillExcelConfig(version)
    const avatarTalentExcelConfigLoader = AvatarTalentExcelConfig(version)

    await avatarSkillDepotExcelConfigLoader.load()
    await avatarSkillExcelConfigLoader.load()
    await proudSkillExcelConfigLoader.load()
    await avatarTalentExcelConfigLoader.load()

    const { data: avatarSkillDepotExcelConfig } = avatarSkillDepotExcelConfigLoader
    const { data: avatarSkillExcelConfig } = avatarSkillExcelConfigLoader
    const { data: proudSkillExcelConfig } = proudSkillExcelConfigLoader
    const { data: avatarTalentExcelConfig } = avatarTalentExcelConfigLoader

    for (let depot of avatarSkillDepotExcelConfig) {
      const {
        Id,
        Skills,
        SubSkills,
        ExtraAbilities,
        Talents,
        TalentStarName,
        InherentProudSkillOpens,
        SkillDepotAbilityGroup,

        EnergySkill,
        LeaderTalent,
        AttackModeSkill
      } = depot

      data.Depot.push({
        Id,
        Skills,
        SubSkills,
        ExtraAbilities,
        Talents,
        TalentStarName,
        InherentProudSkillOpens,
        SkillDepotAbilityGroup,

        EnergySkill,
        LeaderTalent,
        AttackModeSkill
      })
    }

    for (let skill of avatarSkillExcelConfig) {
      const {
        Id,
        AbilityName,
        MaxChargeNum,
        GlobalValueKey,

        CostStamina,
        CdTime,
        TriggerID,
        DragType,
        ProudSkillGroupId,
        ForceCanDoSkill,
        CostElemType,
        CostElemVal,
        IgnoreCDMinusRatio,
        IsRanged,
        NeedMonitor,
        DefaultLocked,
        NeedStore,
        CdSlot,
        EnergyMin
      } = skill

      data.Skill.push({
        Id,
        AbilityName,
        MaxChargeNum,
        GlobalValueKey,

        CostStamina,
        CdTime,
        TriggerID,
        DragType,
        ProudSkillGroupId,
        ForceCanDoSkill,
        CostElemType,
        CostElemVal,
        IgnoreCDMinusRatio,
        IsRanged,
        NeedMonitor,
        DefaultLocked,
        NeedStore,
        CdSlot,
        EnergyMin
      })
    }

    for (let proudSkill of proudSkillExcelConfig) {
      const {
        ProudSkillId,
        ProudSkillGroupId,
        Level,
        ProudSkillType,
        CostItems,
        FilterConds,
        ParamDescList,
        LifeEffectParams,
        OpenConfig,
        AddProps,
        ParamList,

        BreakLevel,
        LifeEffectType,
        CoinCost,
        EffectiveForTeam
      } = proudSkill

      data.ProudSkill.push({
        Id: ProudSkillId,
        GroupId: ProudSkillGroupId,
        Level,
        Type: ProudSkillType,
        CostItems,
        FilterConds,
        ParamDescList,
        LifeEffectParams,
        OpenConfig,
        AddProps,
        ParamList,

        BreakLevel,
        LifeEffectType,
        CoinCost,
        EffectiveForTeam
      })
    }

    for (let avatarTalent of avatarTalentExcelConfig) {
      const {
        TalentId,
        MainCostItemId,
        MainCostItemCount,
        OpenConfig,
        AddProps,
        ParamList,

        PrevTalent
      } = avatarTalent

      data.Talent.push({
        Id: TalentId,
        MainCostItemId,
        MainCostItemCount,
        OpenConfig,
        AddProps,
        ParamList,

        PrevTalent
      })
    }
  }
}

export default (ver: string) => new SkillDataWriter(ver)