import ConfigMonster from "#/BinOutput/ConfigMonster"
import MonsterAffixExcelConfig from "#/ExcelBinOutput/MonsterAffixExcelConfig"
import MonsterDescribeExcelConfig from "#/ExcelBinOutput/MonsterDescribeExcelConfig"
import MonsterExcelConfig from "#/ExcelBinOutput/MonsterExcelConfig"
import MonsterMultiPlayerExcelConfig from "#/ExcelBinOutput/MonsterMultiPlayerExcelConfig"
import MonsterSpecialNameExcelConfig from "#/ExcelBinOutput/MonsterSpecialNameExcelConfig"
import Monster from "#/Text/Monster"
import MonsterDataList from "$DT/MonsterData"
import { getPathHash } from "@/utils/hash"
import Writer from "./writer"

export class MonsterDataWriter extends Writer {
  declare data: MonsterDataList

  constructor(ver: string) {
    super("MonsterData", ver)
  }

  async generateData(): Promise<void> {
    this.data = {
      Monster: [],
      Affix: [],
      Describe: [],
      MultiPlayer: [],
      SpecialName: [],
    }

    const { data, version } = this

    const monsterTxtLoader = Monster(version)
    const configMonsterLoader = ConfigMonster(version)
    const monsterAffixExcelConfigLoader = MonsterAffixExcelConfig(version)
    const monsterDescribeExcelConfigLoader = MonsterDescribeExcelConfig(version)
    const monsterExcelConfigLoader = MonsterExcelConfig(version)
    const monsterMultiPlayerExcelConfigLoader = MonsterMultiPlayerExcelConfig(version)
    const monsterSpecialNameExcelConfigLoader = MonsterSpecialNameExcelConfig(version)

    await monsterTxtLoader.load()
    await configMonsterLoader.loadDir()
    await monsterAffixExcelConfigLoader.load()
    await monsterDescribeExcelConfigLoader.load()
    await monsterExcelConfigLoader.load()
    await monsterMultiPlayerExcelConfigLoader.load()
    await monsterSpecialNameExcelConfigLoader.load()

    const { data: monsterTxt } = monsterTxtLoader
    const { data: configMonster } = configMonsterLoader
    const { data: monsterAffixExcelConfig } = monsterAffixExcelConfigLoader
    const { data: monsterDescribeExcelConfig } = monsterDescribeExcelConfigLoader
    const { data: monsterExcelConfig } = monsterExcelConfigLoader
    const { data: monsterMultiPlayerExcelConfig } = monsterMultiPlayerExcelConfigLoader
    const { data: monsterSpecialNameExcelConfig } = monsterSpecialNameExcelConfigLoader

    for (const monsterAffix of monsterAffixExcelConfig) {
      const { Id, Affix, Comment, AbilityName, IsLegal, IsCommon, PreAdd } = monsterAffix

      data.Affix.push({
        Id,
        Affix,
        Comment,
        AbilityName,
        IsLegal: IsLegal != null && IsLegal.length > 0,
        IsCommon: !!IsCommon,
        PreAdd: !!PreAdd,
      })
    }

    for (const monsterDescribe of monsterDescribeExcelConfig) {
      const { Id, TitleID, SpecialNameLabID } = monsterDescribe

      data.Describe.push({
        Id,
        TitleID,
        SpecialNameLabID,
      })
    }

    for (const monsterMultiPlayer of monsterMultiPlayerExcelConfig) {
      const { Id, PropPer, EndureNum, ElementShield } = monsterMultiPlayer

      data.MultiPlayer.push({
        Id,
        PropPer,
        EndureNum,
        ElementShield,
      })
    }

    for (const monsterSpecialName of monsterSpecialNameExcelConfig) {
      const { SpecialNameID, SpecialNameLabID, IsInRandomList } = monsterSpecialName

      data.SpecialName.push({
        Id: SpecialNameID,
        LabId: SpecialNameLabID,
        IsInRandomList: !!IsInRandomList,
      })
    }

    for (const monster of monsterExcelConfig) {
      const {
        MonsterName,
        Type,
        ServerScript,
        Ai,
        ExcludeWeathers,
        Id,
        CampID,
        MpPropID,
        Affix,
        Equips,
        HpDrops,
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
        IsInvisibleReset,
        IsAIHashCheck,
        SafetyCheck,
        HpBase,
        AttackBase,
        DefenseBase,
        IceSubHurt,
        GrassSubHurt,
        WindSubHurt,
        ElecSubHurt,
        PhysicalSubHurt,
        KillDropId,
        DescribeId,
        EntityBudgetLevel,
        SecurityLevel,
        VisionLevel,
      } = monster

      const combatConfig = monsterTxt
        .find((m) => parseInt(m.Id) === Id)
        ?.CombatConfig?.replace(/^Config(Animal|Monster).*?_/, "")
      const BossName = monsterDescribeExcelConfig.find((m) => m.Id === DescribeId)?.Icon.replace("UI_MonsterIcon_", "")

      const monsterConfig =
        configMonster[combatConfig] ||
        configMonster[MonsterName] ||
        configMonster[MonsterName.replace(/^(Animal|Monster).*?_/, "")] ||
        configMonster[BossName] ||
        configMonster[getPathHash(`Data/_BinOutput/Monster/Config${MonsterName}.MiHoYoBinData`)]

      data.Monster.push({
        Name: MonsterName,
        Type,
        ServerScript,
        Ai,
        ExcludeWeathers,
        Id,
        CampID,
        MpPropID,
        Affix,
        Equips,
        HpDrops,
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
        Config: monsterConfig,
        IsInvisibleReset: !!IsInvisibleReset,
        IsAIHashCheck: !!IsAIHashCheck,
        SafetyCheck: !!SafetyCheck,
        HpBase: HpBase || 0,
        AttackBase: AttackBase || 0,
        DefenseBase: DefenseBase || 0,
        IceSubHurt: IceSubHurt || 0,
        GrassSubHurt: GrassSubHurt || 0,
        WindSubHurt: WindSubHurt || 0,
        ElecSubHurt: ElecSubHurt || 0,
        PhysicalSubHurt: PhysicalSubHurt || 0,
        KillDropId,
        DescribeId,
        EntityBudgetLevel,
        SecurityLevel,
        VisionLevel,
      })
    }
  }
}

export default (ver: string) => new MonsterDataWriter(ver)
