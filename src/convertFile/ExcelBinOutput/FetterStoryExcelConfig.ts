import FetterStoryExcelConfigList from '#/types/ExcelBinOutput/FetterStoryExcelConfig'
import Reader from './reader'

export class FetterStoryExcelConfigReader extends Reader {
  declare data: FetterStoryExcelConfigList

  constructor(ver: string) {
    super('FetterStoryExcelConfigData', ver)
  }
}

export default (ver: string) => new FetterStoryExcelConfigReader(ver)