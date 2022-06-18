import deobfuscate from '@/utils/deobfuscate'
import getJson from '@/utils/getJson'
import Reader from './reader'

let map: any

export class SceneReader extends Reader {
  constructor(ver: string) {
    super('Scene', ver)
    map = getJson(`map${ver}.json`, {})
  }

  async loadDir(): Promise<void> {
    await super.loadDir()

    const { data: scriptData } = this
    this.data = {}
    const { data } = this

    for (let sceneId in scriptData) {
      if (isNaN(parseInt(sceneId))) continue

      console.log('Formatting scene script:', sceneId)

      const sceneScriptData = scriptData[sceneId]
      const sceneData = {
        config: sceneScriptData[`scene${sceneId}`].scene_config,
        group: Object.fromEntries(
          Object.entries(sceneScriptData)
            .filter(e => e[0].indexOf(`scene${sceneId}_group`) === 0)
            .map(e => [e[0].replace(`scene${sceneId}_group`, ''), e[1]])
        ),
        block: Object.fromEntries(
          Object.entries(sceneScriptData)
            .filter(e => e[0].indexOf(`scene${sceneId}_block`) === 0)
            .map(e => [e[0].replace(`scene${sceneId}_block`, ''), e[1]])
        )
      }

      console.log('Parsing scene script:', sceneId)

      data[sceneId] = await deobfuscate(sceneData, map)
    }
  }
}

export default (ver: string) => new SceneReader(ver)