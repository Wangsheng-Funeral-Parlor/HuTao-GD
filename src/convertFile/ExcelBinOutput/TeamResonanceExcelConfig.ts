import TeamResonanceExcelConfigList from "$DT/ExcelBinOutput/TeamResonanceExcelConfig"
import Reader from "./reader"

export class TeamResonanceExcelConfigReader extends Reader {
  declare data: TeamResonanceExcelConfigList

  constructor(ver: string) {
    super("TeamResonanceExcelConfigData", ver)
  }
}

export default (ver: string) => new TeamResonanceExcelConfigReader(ver)
