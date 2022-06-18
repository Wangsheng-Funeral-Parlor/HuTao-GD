import ProudSkillExcelConfigList from '#/types/ExcelBinOutput/ProudSkillExcelConfig'
import Reader from './reader'

export class ProudSkillExcelConfigReader extends Reader {
  declare data: ProudSkillExcelConfigList

  constructor(ver: string) {
    super('ProudSkillExcelConfigData', ver)
  }
}

export default (ver: string) => new ProudSkillExcelConfigReader(ver)