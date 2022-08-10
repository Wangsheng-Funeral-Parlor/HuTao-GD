import AbilityConfig from '#/types/BinOutput/ConfigAbility'
import { ConfigAbilityReader } from './ConfigAbility'

export class ConfigAbilityAvatarReader extends ConfigAbilityReader {
  constructor(ver: string) {
    super(ver, '/Temp/AvatarAbilities', 'Avatar')
  }

  getName(name: string, abilityConfig: { [override: string]: AbilityConfig }[]): string {
    return super.getName(name, abilityConfig)
  }
}

export default (ver: string) => new ConfigAbilityAvatarReader(ver)