import MonsterDescribeExcelConfigList from "$DT/ExcelBinOutput/MonsterDescribeExcelConfig"
import Reader from "./reader"

export class MonsterDescribeExcelConfigReader extends Reader {
  declare data: MonsterDescribeExcelConfigList

  constructor(ver: string) {
    super("MonsterDescribeExcelConfigData", ver)
  }
}

export default (ver: string) => new MonsterDescribeExcelConfigReader(ver)
