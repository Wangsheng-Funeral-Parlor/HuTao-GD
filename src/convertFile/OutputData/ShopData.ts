import ShopGoodsExcelConfig from "#/ExcelBinOutput/ShopGoodsExcelConfig"
import ShopDataList, { ShopData } from "$DT/ShopData"
import Writer from "./writer"

export class ShopDataWriter extends Writer {
  declare data: ShopDataList

  constructor(ver: string) {
    super("ShopData", ver)
  }

  async generateData(): Promise<void> {
    const shopGoodsExcelConfigLoader = ShopGoodsExcelConfig(this.version)

    await shopGoodsExcelConfigLoader.load()

    this.data = shopGoodsExcelConfigLoader.data.map(
      (shopGood) => <ShopData>Object.fromEntries(
          Object.entries(<ShopData>{
            Id: shopGood.GoodsId,
            ShopType: shopGood.ShopType,
            ItemCount: shopGood.ItemCount,
            CostItems: <{ Id: number; Count: number }[]>(
              shopGood.CostItems.filter((costItem) => costItem.Id != null && costItem.Count != null)
            ),
            BeginTime: Math.floor(new Date(shopGood.BeginTime).getTime() / 1e3),
            EndTime: Math.floor(new Date(shopGood.EndTime).getTime() / 1e3),
            PreconditionParamList: shopGood.PreconditionParamList.filter((condition) => condition?.length > 0),
            MinShowLevel: shopGood.MinShowLevel,
            MinPlayerLevel: shopGood.MinPlayerLevel,
            MaxPlayerLevel: shopGood.MaxPlayerLevel,
            SortLevel: shopGood.SortLevel,
            IsBuyOnce: !!shopGood.IsBuyOnce,

            ItemId: shopGood.ItemId,
            BuyLimit: shopGood.BuyLimit,
            Precondition: shopGood.Precondition,
            CostScoin: shopGood.CostScoin,
            RefreshType: shopGood.RefreshType,
            RefreshParam: shopGood.RefreshParam,
            SubTabId: shopGood.SubTabId,
            CostHcoin: shopGood.CostHcoin,
            RotateId: shopGood.RotateId,
            DiscountRate: shopGood.DiscountRate,
            OriginalPrice: shopGood.OriginalPrice,
            PreconditionParam: shopGood.PreconditionParam,
            ShowId: shopGood.ShowId,
            CostMcoin: shopGood.CostMcoin,
            SecondarySheetId: shopGood.SecondarySheetId,
            ChooseOneGroupId: shopGood.ChooseOneGroupId,
          }).filter((e) => e[1] != null)
        )
    )
  }
}

export default (ver: string) => new ShopDataWriter(ver)
