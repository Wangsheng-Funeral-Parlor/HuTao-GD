//import ReaderTemplateList from '$DT/ExcelBinOutput/ReaderTemplate'
//import ReaderTemplateGroup from '$DT/ExcelBinOutput/ReaderTemplate'
import Reader from './reader'

export class ReaderTemplateReader extends Reader {
  //declare data: ReaderTemplateList
  //declare data: ReaderTemplateGroup

  constructor(ver: string) {
    super('ReaderTemplate', ver)
  }
}

export default (ver: string) => new ReaderTemplateReader(ver)