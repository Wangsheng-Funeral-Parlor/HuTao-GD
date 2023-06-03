import MapAreaConfigList from "$DT/ExcelBinOutput/MapAreaConfig"
import Reader from "./reader"

export class MapAreaConfigReader extends Reader {
  declare data: MapAreaConfigList

  constructor(ver: string) {
    super("MapAreaConfigData", ver)
  }
}

export default (ver: string) => new MapAreaConfigReader(ver)
