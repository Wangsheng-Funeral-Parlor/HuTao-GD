import MapAreaConfig from "#/ExcelBinOutput/MapAreaConfig"
import MapAreaDataList from "$DT/MapAreaData"
import Writer from "./writer"

export class MapAreaDataWriter extends Writer {
  declare data: MapAreaDataList

  constructor(ver: string) {
    super("MapAreaData", ver)
  }

  async generateData(): Promise<void> {
    const { version } = this

    const mapAreaConfigLoader = MapAreaConfig(version)

    await mapAreaConfigLoader.load()

    this.data = mapAreaConfigLoader.data.map((mapArea) => ({
      Id: mapArea.Id,
      SceneId: mapArea.SceneID,
      Name: mapArea.Name,
    }))
  }
}

export default (ver: string) => new MapAreaDataWriter(ver)
