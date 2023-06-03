import WorldExcelConfig from "#/ExcelBinOutput/WorldExcelConfig"
import WorldLevelExcelConfig from "#/ExcelBinOutput/WorldLevelExcelConfig"
import WorldDataGroup from "$DT/WorldData"
import Writer from "./writer"

export class WorldDataWriter extends Writer {
  declare data: WorldDataGroup

  constructor(ver: string) {
    super("WorldData", ver)
  }

  async generateData(): Promise<void> {
    this.data = {
      World: [],
      Level: [],
    }

    const { version, data } = this

    const worldExcelConfigLoader = WorldExcelConfig(version)
    const worldLevelExcelConfigLoader = WorldLevelExcelConfig(version)

    await worldExcelConfigLoader.load()
    await worldLevelExcelConfigLoader.load()

    const { data: worldExcelConfig } = worldExcelConfigLoader
    const { data: worldLevelExcelConfig } = worldLevelExcelConfigLoader

    for (const world of worldExcelConfig) {
      const { Id, Type, MainSceneId } = world

      data.World.push({
        Id,
        Type,
        MainSceneId,
      })
    }

    for (const worldLevel of worldLevelExcelConfig) {
      const { Level, MonsterLevel } = worldLevel

      data.Level.push({
        Level,
        MonsterLevel,
      })
    }
  }
}

export default (ver: string) => new WorldDataWriter(ver)
