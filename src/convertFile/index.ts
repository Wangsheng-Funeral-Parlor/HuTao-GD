import { existsSync } from 'fs'
import AbilityData from './OutputData/AbilityData'
import AvatarData from './OutputData/AvatarData'
import DungeonData from './OutputData/DungeonData'
import GrowCurveData from './OutputData/GrowCurveData'
import MapAreaData from './OutputData/MapAreaData'
import MaterialData from './OutputData/MaterialData'
import MonsterData from './OutputData/MonsterData'
import ReliquaryData from './OutputData/ReliquaryData'
import SceneData from './OutputData/SceneData'
import ShopData from './OutputData/ShopData'
import SkillData from './OutputData/SkillData'
import WeaponData from './OutputData/WeaponData'
import WorldData from './OutputData/WorldData'

export default async (ver: string) => {
  const filter = parseInt(process.argv.find(arg => arg.indexOf('-filter:') === 0)?.split(':')[1])

  if (!existsSync(`InputData/${ver}`)) {
    console.log('Missing input data.')
    return
  }

  const writerFactoryList = [
    AbilityData,
    AvatarData,
    DungeonData,
    GrowCurveData,
    MapAreaData,
    MaterialData,
    MonsterData,
    ReliquaryData,
    SceneData,
    ShopData,
    SkillData,
    WeaponData,
    WorldData
  ]

  if (!isNaN(filter)) {
    writerFactoryList.splice(0, filter)
    writerFactoryList.splice(1)
  }

  for (let writerFactory of writerFactoryList) {
    const writer = writerFactory(ver)

    await writer.generateData()
    await writer.write()
  }
}