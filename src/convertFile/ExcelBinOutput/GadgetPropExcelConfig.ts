import GadgetPropExcelConfigList from '#/types/ExcelBinOutput/GadgetPropExcelConfig'
import Reader from './reader'

export class GadgetPropExcelConfigReader extends Reader {
  declare data: GadgetPropExcelConfigList

  constructor(ver: string) {
    super('GadgetPropExcelConfigData', ver)
  }
}

export default (ver: string) => new GadgetPropExcelConfigReader(ver)