import SceneTagConfigList from "$DT/ExcelBinOutput/SceneTagConfig"
import Reader from "./reader"

export class SceneTagConfigReader extends Reader {
  declare data: SceneTagConfigList

  constructor(ver: string) {
    super("SceneTagConfigData", ver)
  }
}

export default (ver: string) => new SceneTagConfigReader(ver)
