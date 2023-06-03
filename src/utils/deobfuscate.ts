import { waitTick } from "./asyncWait"

interface ObfuscateMap {
  [id: string]: string
}

export function isObfuscated(str: string): boolean {
  return str.match(/^[A-Z]{11}$/) != null
}

function fixString(str: string): string {
  return (str.slice(0, 1).toUpperCase() + str.slice(1)).replace(
    str.includes("Config") ? /_[a-zA-Z]/g : /_[a-z]/g,
    (s) => s.slice(1).toUpperCase()
  )
}

function deobfuscateString(str: string, map: ObfuscateMap, unknown: string[] = []): string {
  if (!isObfuscated(str)) return fixString(str)
  const deobfuscated = map[str]

  if (deobfuscated == null) {
    if (!unknown.includes(str)) {
      unknown.push(str)
      console.log("[ERROR]", "Unknown obfuscated:", str)
    }
    return str
  }

  return deobfuscated
}

let counter = 0
export default async function deobfuscate(data: any, map: ObfuscateMap, unknown: string[] = []): Promise<any> {
  if (counter++ % 1250 === 0) await waitTick()

  const isArray = Array.isArray(data)

  let deobfuscated = {}

  for (const k in data) {
    const key = deobfuscateString(k, map, unknown)
    let value = data[k]

    if (typeof value === "object") {
      value = await deobfuscate(value, map, unknown)
    } else if (typeof value === "string") {
      value = deobfuscateString(value, map, unknown)
    }

    deobfuscated[key] = value
  }

  deobfuscated = Object.fromEntries(Object.entries(deobfuscated).sort((a, b) => parseInt(a[0]) - parseInt(b[0])))

  return isArray ? Object.values(deobfuscated) : deobfuscated
}
