import AvatarCostumeExcelConfigList from "$DT/ExcelBinOutput/AvatarCostumeExcelConfig"
import Reader from "./reader"

export class AvatarCostumeExcelConfigReader extends Reader {
  declare data: AvatarCostumeExcelConfigList

  constructor(ver: string) {
    super("AvatarCostumeExcelConfigData", ver)
  }
}

export default (ver: string) => new AvatarCostumeExcelConfigReader(ver)
