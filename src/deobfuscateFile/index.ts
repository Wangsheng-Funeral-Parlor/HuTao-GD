import deobfuscate from '@/utils/deobfuscate'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { cwd } from 'process'

export default async (ver: string) => {
  const inputPath = join(cwd(), 'input.json')
  const mapPath = join(cwd(), `map${ver}.json`)

  if (!existsSync(inputPath)) return console.log('Missing input.json')
  if (!existsSync(mapPath)) return console.log(`Missing map${ver}.json`)

  const input = JSON.parse(readFileSync(inputPath, 'utf8')) || {}
  const map = JSON.parse(readFileSync(mapPath, 'utf8')) || {}

  writeFileSync(join(cwd(), 'output.json'), JSON.stringify(await deobfuscate(input, map), null, 2))
}