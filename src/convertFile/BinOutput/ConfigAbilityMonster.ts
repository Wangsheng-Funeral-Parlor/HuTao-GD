import ConfigAbility from "$DT/BinOutput/Config/ConfigAbility"
import { ConfigAbilityReader } from "./ConfigAbility"

export class ConfigAbilityMonsterReader extends ConfigAbilityReader {
  constructor(ver: string) {
    super(ver, "/Temp/MonsterAbilities", "Monster")
  }

  getName(name: string, abilityConfig: { [override: string]: ConfigAbility }[]): string {
    return super.getName(name, abilityConfig)
  }
}

export default (ver: string) => new ConfigAbilityMonsterReader(ver)
