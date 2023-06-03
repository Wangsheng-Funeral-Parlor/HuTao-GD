import ConfigAbility from "$DT/BinOutput/Config/ConfigAbility"
import { ConfigAbilityReader } from "./ConfigAbility"

export class ConfigAbilityAnimalReader extends ConfigAbilityReader {
  constructor(ver: string) {
    super(ver, "/Temp/AnimalAbilities", "Animal")
  }

  getName(name: string, abilityConfig: { [override: string]: ConfigAbility }[]): string {
    return super.getName(name, abilityConfig)
  }
}

export default (ver: string) => new ConfigAbilityAnimalReader(ver)
