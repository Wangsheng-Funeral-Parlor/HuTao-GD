import { existsSync, readdirSync, statSync } from 'fs'
import AbilityData from './OutputData/AbilityData'
import AvatarData from './OutputData/AvatarData'
import DungeonData from './OutputData/DungeonData'
import GadgetData from './OutputData/GadgetData'
import GrowCurveData from './OutputData/GrowCurveData'
import MapAreaData from './OutputData/MapAreaData'
import MaterialData from './OutputData/MaterialData'
import MonsterData from './OutputData/MonsterData'
import ReliquaryData from './OutputData/ReliquaryData'
import SceneData from './OutputData/SceneData'
import ShopData from './OutputData/ShopData'
import SkillData from './OutputData/SkillData'
import WeaponData from './OutputData/WeaponData'
import WeatherData from './OutputData/WeatherData'
import WorldData from './OutputData/WorldData'

export default async function convertFile(ver: string) {
  const filter = parseInt(process.argv.find(arg => arg.indexOf('-filter:') === 0)?.split(':')[1])

  if (ver === '-1') {
    const versions = readdirSync('InputData')
    for (const v of versions) {
      if (!statSync(`InputData/${v}`).isDirectory()) continue
      await convertFile(v)
    }
    return
  }

  if (!existsSync(`InputData/${ver}`)) {
    console.log('Missing input data.')
    return
  }

  const writerList = [
    AbilityData,
    AvatarData,
    DungeonData,
    GadgetData,
    GrowCurveData,
    MapAreaData,
    MaterialData,
    MonsterData,
    ReliquaryData,
    SceneData,
    ShopData,
    SkillData,
    WeaponData,
    WeatherData,
    WorldData
  ].map(f => f(ver))

  if (!isNaN(filter)) {
    if (filter < 0) {
      console.log('Filter list:')
      for (let i = 0; i < writerList.length; i++) {
        console.log(`  ${i} - ${writerList[i].name}`)
      }
      return
    }

    writerList.splice(0, filter)
    writerList.splice(1)
  }

  for (let writer of writerList) {
    await writer.generateData()
    await writer.write()
  }
}