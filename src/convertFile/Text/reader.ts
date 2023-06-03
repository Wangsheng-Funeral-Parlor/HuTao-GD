import { fileExists, readFile } from "@/utils/fileSystem"

const DATA_DIR = "InputData/%ver%/Text"

export default class Reader {
  path: string
  version: string

  columnNames: string[]
  data: object[]

  constructor(path: string, ver: string, cols: string[]) {
    this.path = path
    this.version = ver

    this.columnNames = cols

    this.load()
  }

  async load() {
    const { path, version } = this
    const filePath = `${DATA_DIR.replace("%ver%", version)}/${path}.txt`

    console.log("Reading:", filePath)

    this.data = []

    if (!(await fileExists(filePath))) return

    const { columnNames, data } = this
    const rows = (await readFile(filePath))
      .toString("utf8")
      .split("\n")
      .slice(1)
      .map((r) => r.split("\t"))

    for (const cols of rows) {
      const row = {}
      for (let i = 0; i < columnNames.length; i++) {
        if (cols[i] == null) break
        row[columnNames[i]] = cols[i]
      }

      data.push(row)
    }
  }
}
