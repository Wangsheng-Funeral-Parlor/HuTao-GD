import AvatarExcelConfigList from '#/types/ExcelBinOutput/AvatarExcelConfig'
import Reader from './reader'

export class AvatarExcelConfigReader extends Reader {
  declare data: AvatarExcelConfigList

  constructor(ver: string) {
    super('AvatarExcelConfigData', ver)
  }
}

export default (ver: string) => new AvatarExcelConfigReader(ver)