import MonsterList from "$DT/Text/Monster"
import Reader from "./reader"

export class MonsterReader extends Reader {
  declare data: MonsterList

  constructor(ver: string) {
    super("MonsterData", ver, [
      "Id",
      "CampID",
      "HPBase",
      "AttackBase",
      "DefenseBase",
      "Critical",
      "CriticalSubHurt",
      "CriticalHurt",
      "FireSubHurt",
      "GrassSubHurt",
      "WaterSubHurt",
      "ElecSubHurt",
      "WindSubHurt",
      "IceSubHurt",
      "RockSubHurt",
      "FireAddHurt",
      "GrassAddHurt",
      "WaterAddHurt",
      "ElecAddHurt",
      "WindAddHurt",
      "IceAddHurt",
      "RockAddHurt",
      "PropGrow1Type",
      "PropGrow1Curve",
      "PropGrow2Type",
      "PropGrow2Curve",
      "PropGrow3Type",
      "PropGrow3Curve",
      "ElementMastery",
      "PhysicalSubHurt",
      "PhysicalAddHurt",
      "Type",
      "ServerScript",
      "CombatConfig",
      "Affix",
      "AI",
      "Equip1",
      "Equip2",
      "IsCanSwim",
      "KillExp",
      "KillExpGrowCurve",
      "Drop1ID",
      "Drop1HpPercent",
      "Drop2ID",
      "Drop2HpPercent",
      "Drop3ID",
      "Drop3HpPercent",
      "KillDropId",
      "IsSceneReward",
      "VisionLevel",
      "ExcludeWeathers",
      "FeatureTagGroupID",
    ])
  }
}

export default (ver: string) => new MonsterReader(ver)
