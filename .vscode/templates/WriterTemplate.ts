import WriterTemplateList from '$DT/WriterTemplate'
import Writer from './writer'

export class WriterTemplateWriter extends Writer {
  declare data: WriterTemplateList

  constructor(ver: string) {
    super('WriterTemplate', ver)
  }
}

export default (ver: string) => new WriterTemplateWriter(ver)