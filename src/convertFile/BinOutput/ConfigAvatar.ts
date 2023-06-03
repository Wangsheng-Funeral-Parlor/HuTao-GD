import ConfigAvatar from "$DT/BinOutput/Config/ConfigAvatar"
import Reader from "./reader"

export class ConfigAvatarReader extends Reader {
  declare data: { [name: string]: ConfigAvatar }

  constructor(ver: string) {
    super("Avatar", ver)
  }

  async loadDir(): Promise<void> {
    await super.loadDir()

    // Remap file name to avatar name
    const { data } = this
    this.data = Object.fromEntries(
      Object.entries(data)
        .filter((e) => e[0].indexOf("ConfigAvatar_") === 0)
        .map((e) => [e[0].match(/(?<=^ConfigAvatar.*?_).*$/)?.[0] || "unknown", e[1]])
    )
  }
}

export default (ver: string) => new ConfigAvatarReader(ver)
