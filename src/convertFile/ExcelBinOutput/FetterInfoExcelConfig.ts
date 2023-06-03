import FetterInfoExcelConfigList from "$DT/ExcelBinOutput/FetterInfoExcelConfig"
import Reader from "./reader"

export class FetterInfoExcelConfigReader extends Reader {
  declare data: FetterInfoExcelConfigList

  constructor(ver: string) {
    super("FetterInfoExcelConfigData", ver)
  }
}

export default (ver: string) => new FetterInfoExcelConfigReader(ver)
