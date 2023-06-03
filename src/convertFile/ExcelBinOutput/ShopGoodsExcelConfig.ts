import ShopGoodsExcelConfigList from "$DT/ExcelBinOutput/ShopGoodsExcelConfig"
import Reader from "./reader"

export class ShopGoodsExcelConfigReader extends Reader {
  declare data: ShopGoodsExcelConfigList

  constructor(ver: string) {
    super("ShopGoodsExcelConfigData", ver)
  }
}

export default (ver: string) => new ShopGoodsExcelConfigReader(ver)
