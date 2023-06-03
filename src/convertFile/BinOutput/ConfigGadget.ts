import ConfigGadget from "$DT/BinOutput/Config/ConfigGadget"
import Reader from "./reader"

export class ConfigGadgetReader extends Reader {
  declare data: { [name: string]: { [jsonName: string]: ConfigGadget } }

  constructor(ver: string) {
    super("Gadget", ver)
  }

  async loadDir(): Promise<void> {
    await super.loadDir()

    // Remap file name to gadget name
    const { data } = this
    this.data = Object.fromEntries(
      Object.entries(data)
        .filter((e) => e[0].indexOf("ConfigGadget_") === 0)
        .map((e) => [e[0].match(/(?<=^ConfigGadget.*?_).*$/)?.[0] || "unknown", e[1]])
    )
  }
}

export default (ver: string) => new ConfigGadgetReader(ver)
