import AbilityGroup from "#/BinOutput/AbilityGroup"
import ConfigAbilityAnimal from "#/BinOutput/ConfigAbilityAnimal"
import ConfigAbilityAvatar from "#/BinOutput/ConfigAbilityAvatar"
import ConfigAbilityEquip from "#/BinOutput/ConfigAbilityEquip"
import ConfigAbilityGadget from "#/BinOutput/ConfigAbilityGadget"
import ConfigAbilityMonster from "#/BinOutput/ConfigAbilityMonster"
import AbilityDataGroup from "$DT/AbilityData"
import Writer from "./writer"

export class AbilityDataWriter extends Writer {
  declare data: AbilityDataGroup

  constructor(ver: string) {
    super("AbilityData", ver)
  }

  async generateData(): Promise<void> {
    const { version } = this

    const configAbilityAnimalLoader = ConfigAbilityAnimal(version)
    const configAbilityAvatarLoader = ConfigAbilityAvatar(version)
    const configAbilityEquipLoader = ConfigAbilityEquip(version)
    const configAbilityGadgetLoader = ConfigAbilityGadget(version)
    const configAbilityMonsterLoader = ConfigAbilityMonster(version)
    const abilityGroupLoader = AbilityGroup(version)

    await configAbilityAnimalLoader.loadDir()
    await configAbilityAvatarLoader.loadDir()
    await configAbilityEquipLoader.loadDir()
    await configAbilityGadgetLoader.loadDir()
    await configAbilityMonsterLoader.loadDir()
    await abilityGroupLoader.loadDir()

    this.data = {
      Animal: configAbilityAnimalLoader.data,
      Avatar: configAbilityAvatarLoader.data,
      Equip: configAbilityEquipLoader.data,
      Gadget: configAbilityGadgetLoader.data,
      Monster: configAbilityMonsterLoader.data,
      Group: abilityGroupLoader.data,
    }
  }
}

export default (ver: string) => new AbilityDataWriter(ver)
