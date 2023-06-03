import { createHash } from "crypto"

export function getPathHash(path: string, s = 5): string {
  const l = 256 * 2 ** Math.floor(path.length / 256)
  const hash = createHash("md5")
  hash.update(path)
  hash.update(Buffer.alloc(l - path.length, 0))
  return hash.digest().slice(0, s).reverse().toString("hex").slice(0, 8)
}
