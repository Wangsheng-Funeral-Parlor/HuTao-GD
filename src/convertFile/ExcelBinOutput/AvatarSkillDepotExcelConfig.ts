import AvatarSkillDepotExcelConfigList from "$DT/ExcelBinOutput/AvatarSkillDepotExcelConfig"
import Reader from "./reader"

export class AvatarSkillDepotExcelConfigReader extends Reader {
  declare data: AvatarSkillDepotExcelConfigList

  constructor(ver: string) {
    super("AvatarSkillDepotExcelConfigData", ver)
  }
}

export default (ver: string) => new AvatarSkillDepotExcelConfigReader(ver)
