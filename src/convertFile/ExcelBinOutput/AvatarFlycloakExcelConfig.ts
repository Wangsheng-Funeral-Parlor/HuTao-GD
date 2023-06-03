import AvatarFlycloakExcelConfigList from "$DT/ExcelBinOutput/AvatarFlycloakExcelConfig"
import Reader from "./reader"

export class AvatarFlycloakExcelConfigReader extends Reader {
  declare data: AvatarFlycloakExcelConfigList

  constructor(ver: string) {
    super("AvatarFlycloakExcelConfigData", ver)
  }
}

export default (ver: string) => new AvatarFlycloakExcelConfigReader(ver)
