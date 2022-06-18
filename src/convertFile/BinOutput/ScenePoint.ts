import ScenePointConfig from '#/types/BinOutput/ScenePoint'
import Reader from './reader'

export class ScenePointReader extends Reader {
  declare data: { [sceneId: number]: ScenePointConfig }

  constructor(ver: string) {
    super('Scene/Point', ver)
  }

  async loadDir(): Promise<void> {
    await super.loadDir()

    // Remap file name to scene id
    const { data } = this
    this.data = Object.fromEntries(
      Object.entries(data).map(e => [
        parseInt((e[0].match(/(?<=scene)\d*?(?=_)/) || [])[0]) || -1,
        e[1]
      ])
    )
  }
}

export default (ver: string) => new ScenePointReader(ver)