import AvatarSkillExcelConfigList from "$DT/ExcelBinOutput/AvatarSkillExcelConfig"
import Reader from "./reader"

export class AvatarSkillExcelConfigReader extends Reader {
  declare data: AvatarSkillExcelConfigList

  constructor(ver: string) {
    super("AvatarSkillExcelConfigData", ver)
  }
}

export default (ver: string) => new AvatarSkillExcelConfigReader(ver)
