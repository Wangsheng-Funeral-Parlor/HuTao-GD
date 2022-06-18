import AbilityConfig from '#/types/BinOutput/ConfigAbility'
import { ConfigAbilityReader } from './ConfigAbility'

export class ConfigAbilityAnimalReader extends ConfigAbilityReader {
  constructor(ver: string) {
    super(ver, '/Temp/AnimalAbilities', 'Animal')
  }

  getName(name: string, abilityConfig: AbilityConfig[]): string {
    return super.getName(name, abilityConfig)
  }
}

export default (ver: string) => new ConfigAbilityAnimalReader(ver)