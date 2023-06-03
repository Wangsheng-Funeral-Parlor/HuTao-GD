import deobfuscate from "@/utils/deobfuscate"
import getJson from "@/utils/getJson"

const DATA_DIR = "InputData/%ver%/ExcelBinOutput"
let map: any

export default class Reader {
  path: string
  version: string
  defaultData: any

  data: any

  constructor(path: string, ver: string, defaultData: any = []) {
    this.path = path
    this.version = ver
    this.defaultData = defaultData

    map = getJson(`Map/${ver}.json`, {})

    this.load()
  }

  async load() {
    const { path, version, defaultData } = this
    const filePath = `${DATA_DIR.replace("%ver%", version)}/${path}.json`

    console.log("Reading:", filePath)
    this.data = await deobfuscate(getJson(filePath, defaultData), map)
  }
}
