import parseLua from "@/utils/parseLua"
import { readdirSync, readFileSync, statSync } from "fs"
import { join } from "path"
import { cwd } from "process"

const DATA_DIR = "InputData/%ver%/Scripts"

export default class Reader {
  path: string
  version: string

  data: any

  constructor(path: string, ver: string) {
    this.path = path
    this.version = ver
  }

  async load() {
    const { path, version } = this
    const filePath = `${DATA_DIR.replace("%ver%", version)}/${path}.lua`

    try {
      console.log("Reading:", filePath)
      this.data = await parseLua(readFileSync(filePath, "utf8"))
    } catch (err) {
      console.log("[ERROR]", "Parse error:", err)
    }
  }

  async loadDir() {
    const { path, version } = this
    const dirPath = `${DATA_DIR.replace("%ver%", version)}/${path}`

    this.data = await this._loadDir(dirPath)
  }

  private async _loadDir(dirPath: string) {
    const fileList = readdirSync(join(cwd(), dirPath))
    const ret = {}

    for (const file of fileList) {
      const filePath = `${dirPath}/${file}`

      if (statSync(filePath).isDirectory()) {
        ret[file] = await this._loadDir(filePath)
        continue
      }

      if (file.indexOf(".lua") === -1) continue

      try {
        console.log("Reading:", filePath)
        ret[file.replace(".lua", "")] = await parseLua(readFileSync(filePath, "utf8"))
      } catch (err) {
        console.log("[ERROR]", "Parse error:", (<Error>err).message)
      }
    }

    return ret
  }
}
