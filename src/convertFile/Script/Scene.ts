import SceneScriptConfigMap from "$DT/Script/SceneScriptConfig"
import deobfuscate from "@/utils/deobfuscate"
import getJson from "@/utils/getJson"
import Reader from "./reader"

let map: any

export class SceneReader extends Reader {
  declare data: SceneScriptConfigMap

  constructor(ver: string) {
    super("Scene", ver)
    map = getJson(`Map/${ver}.json`, {})
  }

  async loadDir(): Promise<void> {
    await super.loadDir()

    const { data: scriptData } = this
    this.data = {}
    const { data } = this

    for (const sceneId in scriptData) {
      if (isNaN(parseInt(sceneId))) continue

      console.log("Parsing scene script:", sceneId)

      const sceneScriptData = scriptData[sceneId]
      const blockIds = Object.values(sceneScriptData[`scene${sceneId}`].blocks || {})
      const blockRects = Object.values(sceneScriptData[`scene${sceneId}`].block_rects || {})
      const blockRectMap = Object.fromEntries(blockIds.map((id, i) => [id, blockRects[i]]))
      const sceneData = {
        config: sceneScriptData[`scene${sceneId}`].scene_config,
        group: Object.fromEntries(
          Object.entries(sceneScriptData)
            .filter((e) => e[0].indexOf(`scene${sceneId}_group`) === 0)
            .map((e) => {
              const groupId = parseInt(e[0].replace(`scene${sceneId}_group`, ""))
              const groupData = e[1]

              for (const key in groupData) {
                if (key === "InitConfig") continue
                groupData[key] = Object.values(groupData[key] || {})
              }

              return [groupId, groupData]
            })
        ),
        block: Object.fromEntries(
          Object.entries(sceneScriptData)
            .filter((e) => e[0].indexOf(`scene${sceneId}_block`) === 0)
            .map((e) => {
              const blockId = parseInt(e[0].replace(`scene${sceneId}_block`, ""))
              const blockData = Object.assign({}, e[1], { rect: blockRectMap[blockId] || null })
              return [blockId, blockData]
            })
        ),
      }

      console.log("Formatting scene script:", sceneId)

      data[sceneId] = await deobfuscate(sceneData, map)
    }
  }
}

export default (ver: string) => new SceneReader(ver)
