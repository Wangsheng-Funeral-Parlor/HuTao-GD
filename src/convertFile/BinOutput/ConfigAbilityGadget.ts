import AbilityConfig from '#/types/BinOutput/ConfigAbility'
import { ConfigAbilityReader } from './ConfigAbility'

export class ConfigAbilityGadgetReader extends ConfigAbilityReader {
  constructor(ver: string) {
    super(ver, '/Temp/GadgetAbilities')
  }

  getName(name: string, abilityConfig: { [override: string]: AbilityConfig }[]): string {
    return super.getName(name, abilityConfig)
  }
}

export default (ver: string) => new ConfigAbilityGadgetReader(ver)