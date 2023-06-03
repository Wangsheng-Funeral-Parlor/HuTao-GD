import DungeonChallengeConfig from "#/ExcelBinOutput/DungeonChallengeConfig"
import DungeonElementChallengeExcelConfig from "#/ExcelBinOutput/DungeonElementChallengeExcelConfig"
import DungeonEntryExcelConfig from "#/ExcelBinOutput/DungeonEntryExcelConfig"
import DungeonExcelConfig from "#/ExcelBinOutput/DungeonExcelConfig"
import DungeonLevelEntityConfig from "#/ExcelBinOutput/DungeonLevelEntityConfig"
import DungeonMapAreaExcelConfig from "#/ExcelBinOutput/DungeonMapAreaExcelConfig"
import DungeonPassExcelConfig from "#/ExcelBinOutput/DungeonPassExcelConfig"
import DungeonRosterConfig from "#/ExcelBinOutput/DungeonRosterConfig"
import DungeonSerialConfig from "#/ExcelBinOutput/DungeonSerialConfig"
import DungeonDataList from "$DT/DungeonData"
import Writer from "./writer"

export class DungeonDataWriter extends Writer {
  declare data: DungeonDataList

  constructor(ver: string) {
    super("DungeonData", ver)
  }

  async generateData(): Promise<void> {
    this.data = {
      Dungeon: [],
      Entry: [],
      MapArea: [],
      Roster: [],
      Challenge: [],
    }

    const { data, version } = this

    const dungeonExcelConfigLoader = DungeonExcelConfig(version)
    const dungeonChallengeConfigLoader = DungeonChallengeConfig(version)
    const dungeonElementChallengeExcelConfigLoader = DungeonElementChallengeExcelConfig(version)
    const dungeonLevelEntityConfigLoader = DungeonLevelEntityConfig(version)
    const dungeonPassExcelConfigLoader = DungeonPassExcelConfig(version)
    const dungeonSerialConfigLoader = DungeonSerialConfig(version)
    const dungeonEntryExcelConfigLoader = DungeonEntryExcelConfig(version)
    const dungeonMapAreaExcelConfigLoader = DungeonMapAreaExcelConfig(version)
    const dungeonRosterConfigLoader = DungeonRosterConfig(version)

    await dungeonExcelConfigLoader.load()
    await dungeonChallengeConfigLoader.load()
    await dungeonElementChallengeExcelConfigLoader.load()
    await dungeonLevelEntityConfigLoader.load()
    await dungeonPassExcelConfigLoader.load()
    await dungeonSerialConfigLoader.load()
    await dungeonEntryExcelConfigLoader.load()
    await dungeonMapAreaExcelConfigLoader.load()
    await dungeonRosterConfigLoader.load()

    const { data: dungeonExcelConfig } = dungeonExcelConfigLoader
    const { data: dungeonChallengeConfig } = dungeonChallengeConfigLoader
    const { data: dungeonElementChallengeExcelConfig } = dungeonElementChallengeExcelConfigLoader
    const { data: dungeonLevelEntityConfig } = dungeonLevelEntityConfigLoader
    const { data: dungeonPassExcelConfig } = dungeonPassExcelConfigLoader
    const { data: dungeonSerialConfig } = dungeonSerialConfigLoader
    const { data: dungeonEntryExcelConfig } = dungeonEntryExcelConfigLoader
    const { data: dungeonMapAreaExcelConfig } = dungeonMapAreaExcelConfigLoader
    const { data: dungeonRosterConfig } = dungeonRosterConfigLoader

    for (const challenge of dungeonChallengeConfig) {
      const {
        Id,
        ChallengeType,
        NoSuccessHint,
        NoFailHint,
        IsBlockTopTimer,
        IsSuccessWhenNotSettled,
        InterruptButtonType,
        SubChallengeFadeOutRule,
        SubChallengeFadeOutDelayTime,
        SubChallengeBannerRule,
        RecordType,
        ActivitySkillID,
      } = challenge

      this.data.Challenge.push({
        Id,
        ChallengeType,
        NoSuccessHint,
        NoFailHint,
        IsBlockTopTimer,
        IsSuccessWhenNotSettled,
        InterruptButtonType,
        SubChallengeFadeOutRule,
        SubChallengeFadeOutDelayTime,
        SubChallengeBannerRule,
        RecordType,
        ActivitySkillID,
      })
    }
    for (const dungeon of dungeonExcelConfig) {
      const {
        Id,
        Type,
        SceneId,
        InvolveType,
        SettleCountdownTime,
        FailSettleCountdownTime,
        QuitSettleCountdownTime,
        SettleShows,
        RecommendElementTypes,
        LevelConfigMap,
        EnterCostItems,
        CityID,

        ShowLevel,
        LimitLevel,
        LevelRevise,
        PassCond,
        ReviveMaxCount,
        DayEnterCount,
        PassRewardPreviewID,
        ForbiddenRestart,
        SettleUIType,
        StateType,
        AvatarLimitType,
        IsDynamicLevel,
        SubType,
        SerialId,
        PassJumpDungeon,
        DontShowPushTips,
        PlayType,
        EventInterval,
        FirstPassRewardPreviewID,
        ReviveIntervalTime,
        StatueCostID,
        StatueCostCount,
        StatueDrop,
      } = dungeon

      const challenge = dungeonChallengeConfig.find((d) => d.Id === Id)
      const elementChallenge = dungeonElementChallengeExcelConfig.find((d) => d.DungeonId === Id)
      const levelEntity = dungeonLevelEntityConfig.find((d) => d.Id === Id)
      const pass = dungeonPassExcelConfig.find((d) => d.Id === Id)
      const serial = dungeonSerialConfig.find((d) => d.Id === Id)

      data.Dungeon.push({
        Id,
        Type,
        SceneId,
        InvolveType,
        SettleCountdownTime,
        FailSettleCountdownTime,
        QuitSettleCountdownTime,
        SettleShows,
        RecommendElementTypes,
        LevelConfigMap,
        EnterCostItems,
        CityID,

        ShowLevel,
        LimitLevel,
        LevelRevise,
        PassCond,
        ReviveMaxCount,
        DayEnterCount,
        PassRewardPreviewID,
        ForbiddenRestart: !!ForbiddenRestart,
        SettleUIType,
        StateType,
        AvatarLimitType,
        IsDynamicLevel: !!IsDynamicLevel,
        SubType,
        SerialId,
        PassJumpDungeon,
        DontShowPushTips: !!DontShowPushTips,
        PlayType,
        EventInterval,
        FirstPassRewardPreviewID,
        ReviveIntervalTime,
        StatueCostID,
        StatueCostCount,
        StatueDrop,

        Challenge: challenge
          ? {
              Id: challenge.Id,
              ChallengeType: challenge.ChallengeType,
              NoSuccessHint: challenge.NoSuccessHint,
              NoFailHint: !!challenge.NoFailHint,
              IsBlockTopTimer: !!challenge.IsBlockTopTimer,
              IsSuccessWhenNotSettled: !!challenge.IsSuccessWhenNotSettled,

              InterruptButtonType: challenge.InterruptButtonType,
              SubChallengeFadeOutRule: challenge.SubChallengeFadeOutRule,
              SubChallengeFadeOutDelayTime: challenge.SubChallengeFadeOutDelayTime,
              SubChallengeBannerRule: challenge.SubChallengeBannerRule,
              RecordType: challenge.RecordType,
              ActivitySkillID: challenge.ActivitySkillID,
            }
          : null,

        ElementChallenge: elementChallenge
          ? {
              TrialAvatarId: elementChallenge.TrialAvatarId,
              TutorialId: elementChallenge.TutorialId,
            }
          : null,

        LevelEntity: levelEntity
          ? {
              ClientId: levelEntity.ClientId,
              LevelConfigName: levelEntity.LevelConfigName,
              Show: !!levelEntity.Show,
            }
          : null,

        Pass: pass
          ? {
              Conds: pass.Conds,
              LogicType: pass.LogicType,
            }
          : null,

        Serial: serial
          ? {
              MaxTakeNum: serial.MaxTakeNum,
              TakeCost: serial.TakeCost,
            }
          : null,
      })
    }

    for (const dungeonEntry of dungeonEntryExcelConfig) {
      const {
        Id,
        SceneId,
        DungeonEntryId,
        Type,
        CooldownTipsDungeonId,
        SatisfiedCond,
        DescriptionCycleRewardList,

        IsShowInAdvHandbook,
        CondComb,
        SystemOpenUiId,
        RewardDataId,
        IsDailyRefresh,
        IsDefaultOpen,
      } = dungeonEntry

      data.Entry.push({
        Id,
        SceneId,
        DungeonEntryId,
        Type,
        CooldownTipsDungeonId,
        SatisfiedCond,
        DescriptionCycleRewardList,

        IsShowInAdvHandbook: !!IsShowInAdvHandbook,
        CondComb,
        SystemOpenUiId,
        RewardDataId,
        IsDailyRefresh: !!IsDailyRefresh,
        IsDefaultOpen: !!IsDefaultOpen,
      })
    }

    for (const dungeonMapArea of dungeonMapAreaExcelConfig) {
      const { DungeonID, AreaID } = dungeonMapArea

      data.MapArea.push({
        DungeonID,
        AreaID,
      })
    }

    for (const dungeonRoster of dungeonRosterConfig) {
      const { Id, OpenTimeStr, CycleTime, CycleType, RosterPool } = dungeonRoster

      data.Roster.push({
        Id,
        OpenTimeStr,
        CycleTime,
        CycleType,
        RosterPool,
      })
    }
  }
}

export default (ver: string) => new DungeonDataWriter(ver)
