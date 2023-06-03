import { isObfuscated } from "@/utils/deobfuscate"
import { existsSync, readFileSync, writeFileSync } from "fs"
import { join } from "path"
import { cwd } from "process"

function type(any: any): string {
  return Array.isArray(any) ? "array" : typeof any
}

function generate(obfuscated: any, deobfuscated: any, map: { [key: string]: string }) {
  const obfuscatedType = type(obfuscated)
  const deobfuscatedType = type(deobfuscated)

  if (deobfuscated.isFormula != null || deobfuscated.isDynamic != null || deobfuscated.dynamicValue != null) return
  if (obfuscatedType !== deobfuscatedType)
    return console.log(`Mismatch type: ${JSON.stringify(obfuscated)}, ${JSON.stringify(deobfuscated)}`)

  switch (obfuscatedType) {
    case "object": {
      const obfuscatedKeys = Object.keys(obfuscated)
      const deobfuscatedKeys = Object.keys(deobfuscated)

      if (obfuscatedKeys.length !== deobfuscatedKeys.length) {
        console.log(
          `Mismatch length: ${JSON.stringify(obfuscatedKeys, null, 2)}, ${JSON.stringify(deobfuscatedKeys, null, 2)}`
        )
        return
      }

      for (let i = 0; i < obfuscatedKeys.length; i++) {
        generate(obfuscatedKeys[i], deobfuscatedKeys[i], map)
        generate(obfuscated[obfuscatedKeys[i]], deobfuscated[deobfuscatedKeys[i]], map)
      }
      break
    }
    case "array": {
      if (obfuscated.length !== deobfuscated.length) {
        console.log(`Mismatch length: ${JSON.stringify(obfuscated, null, 2)}, ${JSON.stringify(deobfuscated, null, 2)}`)
        return
      }

      for (let i = 0; i < obfuscated.length; i++) {
        generate(obfuscated[i], deobfuscated[i], map)
      }
      break
    }
    case "string": {
      if (obfuscated !== deobfuscated && isObfuscated(obfuscated) && !isObfuscated(deobfuscated))
        map[obfuscated] = deobfuscated
      break
    }
  }
}

function fixName(obj: { [key: string]: string }) {
  for (const key in obj) {
    const val = obj[key].replace("MoleMole.Config.", "")
    obj[key] = (val.slice(0, 1).toUpperCase() + val.slice(1)).replace(/_[a-z]/g, (s) => s.slice(1).toUpperCase())
  }
}

export default async (ver: string) => {
  const inputAPath = join(cwd(), "inputA.json")
  const inputBPath = join(cwd(), "inputB.json")
  const mapPath = join(cwd(), `Map/${ver}.json`)

  if (!existsSync(inputAPath)) return console.log("Missing inputA.json")
  if (!existsSync(inputBPath)) return console.log("Missing inputB.json")
  if (!existsSync(mapPath)) return console.log(`Missing Map/${ver}.json`)

  const inputA = JSON.parse(readFileSync(inputAPath, "utf8")) || {}
  const inputB = JSON.parse(readFileSync(inputBPath, "utf8")) || {}
  const map = JSON.parse(readFileSync(mapPath, "utf8")) || {}

  generate(inputA, inputB, map)
  fixName(map)

  writeFileSync(join(cwd(), `Map/${ver}.json`), JSON.stringify(map, null, 2))
}
