import ConfigTalent from "$DT/BinOutput/Config/ConfigTalent"
import Reader from "./reader"

export class ConfigTalentReader extends Reader {
  declare data: { [name: string]: ConfigTalent[] }

  constructor(ver: string, extra = "") {
    super("Talent" + extra, ver)
  }

  async loadDir(): Promise<void> {
    await super.loadDir()

    // Remap file name to talent name
    const { data } = <{ data: object }>this
    this.data = {}

    for (const fileName in data) Object.assign(this.data, data[fileName])
  }
}

export default (ver: string) => new ConfigTalentReader(ver)
