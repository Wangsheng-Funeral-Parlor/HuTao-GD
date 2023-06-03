import AvatarCurveExcelConfig from "#/ExcelBinOutput/AvatarCurveExcelConfig"
import GadgetCurveExcelConfig from "#/ExcelBinOutput/GadgetCurveExcelConfig"
import MonsterCurveExcelConfig from "#/ExcelBinOutput/MonsterCurveExcelConfig"
import WeaponCurveExcelConfig from "#/ExcelBinOutput/WeaponCurveExcelConfig"
import GrowCurveDataGroup from "$DT/GrowCurveData"
import Writer from "./writer"

export class GrowCurveDataWriter extends Writer {
  declare data: GrowCurveDataGroup

  constructor(ver: string) {
    super("GrowCurveData", ver)
  }

  async generateData(): Promise<void> {
    const { version } = this

    const avatarCurveExcelConfigLoader = AvatarCurveExcelConfig(version)
    const monsterCurveExcelConfigLoader = MonsterCurveExcelConfig(version)
    const weaponCurveExcelConfigLoader = WeaponCurveExcelConfig(version)
    const gadgetCurveExcelConfigLoader = GadgetCurveExcelConfig(version)

    await avatarCurveExcelConfigLoader.load()
    await monsterCurveExcelConfigLoader.load()
    await weaponCurveExcelConfigLoader.load()
    await gadgetCurveExcelConfigLoader.load()

    this.data = {
      Avatar: avatarCurveExcelConfigLoader.data,
      Monster: monsterCurveExcelConfigLoader.data,
      Weapon: weaponCurveExcelConfigLoader.data,
      Gadget: gadgetCurveExcelConfigLoader.data,
    }
  }
}

export default (ver: string) => new GrowCurveDataWriter(ver)
