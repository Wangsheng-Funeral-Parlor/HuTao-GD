import ConfigScene from "$DT/BinOutput/Config/ConfigScene"
import Reader from "./reader"

export class ConfigSceneReader extends Reader {
  declare data: { [sceneId: number]: ConfigScene }

  constructor(ver: string) {
    super("Scene/Point", ver)
  }

  async loadDir(): Promise<void> {
    await super.loadDir()

    // Remap file name to scene id
    const { data } = this
    this.data = Object.fromEntries(
      Object.entries(data).map((e) => [parseInt((e[0].match(/(?<=scene)\d*?(?=_)/) || [])[0]) || -1, e[1]])
    )
  }
}

export default (ver: string) => new ConfigSceneReader(ver)
