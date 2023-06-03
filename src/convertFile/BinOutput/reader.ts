import deobfuscate from "@/utils/deobfuscate"
import getJson from "@/utils/getJson"
import { readdirSync } from "fs"
import { join } from "path"
import { cwd } from "process"

const DATA_DIR = "InputData/%ver%/BinOutput"
let map: any

export default class Reader {
  path: string
  version: string
  defaultData: any

  data: any

  constructor(path: string, ver: string, defaultData: any = {}) {
    this.path = path
    this.version = ver
    this.defaultData = defaultData

    map = getJson(`Map/${ver}.json`, {})
  }

  async load() {
    const { path, version, defaultData } = this
    const filePath = `${DATA_DIR.replace("%ver%", version)}/${path}.json`

    console.log("Reading:", filePath)
    this.data = await deobfuscate(getJson(filePath, defaultData), map)
  }

  async loadDir() {
    const { path, version, defaultData } = this
    const dirPath = `${DATA_DIR.replace("%ver%", version)}/${path}`
    const fileList = readdirSync(join(cwd(), dirPath))

    const data = (this.data = {})

    for (const file of fileList) {
      const filePath = `${dirPath}/${file}`

      console.log("Reading:", filePath)
      data[file.replace(".json", "")] = await deobfuscate(getJson(filePath, defaultData), map)
    }
  }
}
