import ReliquaryAffixExcelConfigList from "$DT/ExcelBinOutput/ReliquaryAffixExcelConfig"
import Reader from "./reader"

export class ReliquaryAffixExcelConfigReader extends Reader {
  declare data: ReliquaryAffixExcelConfigList

  constructor(ver: string) {
    super("ReliquaryAffixExcelConfigData", ver)
  }
}

export default (ver: string) => new ReliquaryAffixExcelConfigReader(ver)
