import AvatarTalentExcelConfigList from '#/types/ExcelBinOutput/AvatarTalentExcelConfig'
import Reader from './reader'

export class AvatarTalentExcelConfigReader extends Reader {
  declare data: AvatarTalentExcelConfigList

  constructor(ver: string) {
    super('AvatarTalentExcelConfigData', ver)
  }
}

export default (ver: string) => new AvatarTalentExcelConfigReader(ver)