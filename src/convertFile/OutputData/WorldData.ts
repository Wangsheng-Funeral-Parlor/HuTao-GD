import WorldExcelConfig from '#/ExcelBinOutput/WorldExcelConfig'
import WorldDataGroup from '#/types/WorldData'
import Writer from './writer'

export class WorldDataWriter extends Writer {
  declare data: WorldDataGroup

  constructor(ver: string) {
    super('WorldData', ver)
  }

  async generateData(): Promise<void> {
    this.data = {
      World: [],
      Level: []
    }

    const { version, data } = this

    const worldExcelConfigLoader = WorldExcelConfig(version)

    await worldExcelConfigLoader.load()

    const { data: worldConfig } = worldExcelConfigLoader

    for (let world of worldConfig) {
      const { Id, Type, MainSceneId } = world

      data.World.push({
        Id,
        Type,
        MainSceneId
      })
    }
  }
}

export default (ver: string) => new WorldDataWriter(ver)