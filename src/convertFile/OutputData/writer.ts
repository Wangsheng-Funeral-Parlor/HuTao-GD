import fs, { existsSync, mkdirSync } from "fs"
const { readFile, writeFile } = fs.promises

const DATA_DIR = "OutputData"

export default class Writer {
  name: string
  version: string

  data: any

  constructor(name: string, ver: string) {
    this.name = name
    this.version = ver
  }

  async generateData() {
    this.data = {}
  }

  async write() {
    const { name, version, data } = this
    const dirPath = `${DATA_DIR}/${version}`
    const filePath = `${dirPath}/${name}.json`
    const fileData = JSON.stringify(data, null, 2)

    try {
      if (!existsSync(dirPath)) mkdirSync(dirPath, { recursive: true })

      if (existsSync(filePath) && fileData === (await readFile(filePath, "utf8"))) {
        console.log("Skip Writing:", filePath)
        return
      }

      console.log("Writing:", filePath)
      await writeFile(filePath, fileData)
    } catch (err) {
      console.log("[ERROR]", err)
    }
  }
}
