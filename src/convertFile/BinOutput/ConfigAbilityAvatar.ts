import ConfigAbility from "$DT/BinOutput/Config/ConfigAbility"
import { ConfigAbilityReader } from "./ConfigAbility"

export class ConfigAbilityAvatarReader extends ConfigAbilityReader {
  constructor(ver: string) {
    super(ver, "/Temp/AvatarAbilities", "Avatar")
  }

  getName(name: string, abilityConfig: { [override: string]: ConfigAbility }[]): string {
    return super.getName(name, abilityConfig)
  }
}

export default (ver: string) => new ConfigAbilityAvatarReader(ver)
