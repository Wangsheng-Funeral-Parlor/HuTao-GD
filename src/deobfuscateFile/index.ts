import deobfuscate from "@/utils/deobfuscate"
import getJson from "@/utils/getJson"
import { existsSync, readFileSync, writeFileSync } from "fs"
import { join } from "path"
import { cwd } from "process"

export default async (ver: string) => {
  const inputPath = join(cwd(), "input.json")

  if (!existsSync(inputPath)) return console.log("Missing input.json")

  const input = JSON.parse(readFileSync(inputPath, "utf8")) || {}
  const map = getJson(`Map/${ver}.json`, {})

  writeFileSync(join(cwd(), "output.json"), JSON.stringify(await deobfuscate(input, map), null, 2))
}
