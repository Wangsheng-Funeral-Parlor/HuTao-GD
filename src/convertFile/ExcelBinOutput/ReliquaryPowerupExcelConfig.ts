import ReliquaryPowerupExcelConfigList from '#/types/ExcelBinOutput/ReliquaryPowerupExcelConfig'
import Reader from './reader'

export class ReliquaryPowerupExcelConfigReader extends Reader {
  declare data: ReliquaryPowerupExcelConfigList

  constructor(ver: string) {
    super('ReliquaryPowerupExcelConfigData', ver)
  }
}

export default (ver: string) => new ReliquaryPowerupExcelConfigReader(ver)