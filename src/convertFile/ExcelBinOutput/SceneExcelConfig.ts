import SceneExcelConfigList from "$DT/ExcelBinOutput/SceneExcelConfig"
import Reader from "./reader"

export class SceneExcelConfigReader extends Reader {
  declare data: SceneExcelConfigList

  constructor(ver: string) {
    super("SceneExcelConfigData", ver)
  }
}

export default (ver: string) => new SceneExcelConfigReader(ver)
