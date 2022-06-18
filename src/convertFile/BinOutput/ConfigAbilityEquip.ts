import AbilityConfig from '#/types/BinOutput/ConfigAbility'
import { ConfigAbilityReader } from './ConfigAbility'

export class ConfigAbilityEquipReader extends ConfigAbilityReader {
  constructor(ver: string) {
    super(ver, '/Temp/EquipAbilities', 'Weapon')
  }

  getName(name: string, abilityConfig: AbilityConfig[]): string {
    return super.getName(name, abilityConfig)
  }
}

export default (ver: string) => new ConfigAbilityEquipReader(ver)