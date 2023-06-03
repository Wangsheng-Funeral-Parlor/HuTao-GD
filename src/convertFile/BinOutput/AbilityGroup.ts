import ConfigAbilityGroup from "$DT/BinOutput/Config/ConfigAbilityGroup"
import Reader from "./reader"

export class AbilityGroupReader extends Reader {
  declare data: { [name: string]: ConfigAbilityGroup }

  constructor(ver: string) {
    super("AbilityGroup", ver)
  }

  async loadDir(): Promise<void> {
    await super.loadDir()

    const { data } = this
    this.data = Object.fromEntries([].concat(...Object.entries(data).map((e) => Object.entries(e[1]))))
  }
}

export default (ver: string) => new AbilityGroupReader(ver)
