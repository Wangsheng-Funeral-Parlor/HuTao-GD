import ChestDrop from '#/Text/ChestDrop'
import DropLeaf from '#/Text/DropLeaf'
import DropSubfield from '#/Text/DropSubfield'
import DropTree from '#/Text/DropTree'
import EntityDropSubfield from '#/Text/EntityDropSubfield'
import MonsterDrop from '#/Text/MonsterDrop'
import DropDataGroup from '$DT/DropData'
import Writer from './writer'

export class DropDataWriter extends Writer {
  declare data: DropDataGroup

  constructor(ver: string) {
    super('DropData', ver)
  }

  async generateData(): Promise<void> { // NOSONAR I don't fucking care
    this.data = {
      Subfield: [],
      Tree: [],
      Leaf: [],
      Entity: [],
      Chest: [],
      Monster: []
    }

    const { data, version } = this

    const dropSubfieldLoader = DropSubfield(version)
    const dropTreeLoader = DropTree(version)
    const dropLeafLoader = DropLeaf(version)
    const entityDropSubfieldLoader = EntityDropSubfield(version)
    const chestDropLoader = ChestDrop(version)
    const monsterDropLoader = MonsterDrop(version)

    await dropSubfieldLoader.load()
    await dropTreeLoader.load()
    await dropLeafLoader.load()
    await entityDropSubfieldLoader.load()
    await chestDropLoader.load()
    await monsterDropLoader.load()

    const { data: dropSubfield } = dropSubfieldLoader
    const { data: dropTree } = dropTreeLoader
    const { data: dropLeaf } = dropLeafLoader
    const { data: entityDropSubfield } = entityDropSubfieldLoader
    const { data: chestDrop } = chestDropLoader
    const { data: monsterDrop } = monsterDropLoader

    for (const subfield of dropSubfield) {
      const {
        Id,
        MaxLevel,
        DropId
      } = subfield

      data.Subfield.push({
        Id: parseInt(Id) || 0,
        MaxLevel: parseInt(MaxLevel) || 0,
        DropId: parseInt(DropId) || 0
      })
    }

    for (const tree of dropTree) {
      const {
        DropId,
        MinLevel,
        MaxLevel,
        Random,
        Tier
      } = tree

      const leafList = []
      const leafEntries = Object.entries(tree).filter(e => e[0].match(/Leaf\d+(Id|Count|Weight)/))

      for (const leafEntry of leafEntries) {
        const index = (parseInt(leafEntry[0].match(/\d+/)?.[0]) || 0) - 1
        const key = leafEntry[0].match(/(?<=Leaf\d+).*/)?.[0]
        if (index < 0 || key == null) continue

        leafList[index] = leafList[index] || {}
        leafList[index][key] = parseInt(leafEntry[1]) || 0
      }

      data.Tree.push({
        Id: parseInt(DropId) || 0,
        MinLevel: parseInt(MinLevel) || 0,
        MaxLevel: parseInt(MaxLevel) || 0,
        Random: parseInt(Random) || 0,
        Tier: parseInt(Tier) || 0,
        Leaf: leafList.filter(e => e.Id)
      })
    }

    for (const leaf of dropLeaf) {
      const {
        LeafId,
        MinLevel,
        MaxLevel,
        Random
      } = leaf

      const itemList = []
      const itemEntries = Object.entries(leaf).filter(e => e[0].match(/Item\d+(Id|Weight|Interval)/))

      for (const itemEntry of itemEntries) {
        const index = (parseInt(itemEntry[0].match(/\d+/)?.[0]) || 0) - 1
        const key = itemEntry[0].match(/(?<=Item\d+).*/)?.[0]
        if (index < 0 || key == null) continue

        itemList[index] = itemList[index] || {}
        itemList[index][key] = parseInt(itemEntry[1]) || 0
      }

      data.Leaf.push({
        Id: parseInt(LeafId) || 0,
        MinLevel: parseInt(MinLevel) || 0,
        MaxLevel: parseInt(MaxLevel) || 0,
        Random: parseInt(Random) || 0,
        Item: itemList.filter(e => e.Id)
      })
    }

    for (const entity of entityDropSubfield) {
      const {
        EntityId,
        Type,
        Limit
      } = entity

      const branchList = []
      const branchEntries = Object.entries(entity).filter(e => e[0].match(/Branch\d+(Type|SubfieldId)/))

      for (const branchEntry of branchEntries) {
        const index = (parseInt(branchEntry[0].match(/\d+/)?.[0]) || 0) - 1
        const key = branchEntry[0].match(/(?<=Branch\d+).*/)?.[0]
        if (index < 0 || key == null) continue

        branchList[index] = branchList[index] || {}
        branchList[index][key] = key === 'Type' ? branchEntry[1] : (parseInt(branchEntry[1]) || 0)
      }

      data.Entity.push({
        EntityId: parseInt(EntityId) || 0,
        Type: parseInt(Type) || 0,
        Branch: branchList.filter(e => e.Type),
        Limit: parseInt(Limit) || 0
      })
    }

    for (const chest of chestDrop) {
      const {
        MinLevel,
        Index,
        DropId,
        DropCount,
        SourceType,
        Category
      } = chest

      data.Chest.push({
        MinLevel: parseInt(MinLevel) || 0,
        Index,
        DropId: parseInt(DropId) || 0,
        DropCount: parseInt(DropCount) || 0,
        SourceType: parseInt(SourceType) || 0,
        Category
      })
    }

    for (const monster of monsterDrop) {
      const {
        MinLevel,
        Index,
        DropId,
        DropCount
      } = monster

      data.Monster.push({
        MinLevel: parseInt(MinLevel) || 0,
        Index,
        DropId: parseInt(DropId) || 0,
        DropCount: parseInt(DropCount) || 0
      })
    }
  }
}

export default (ver: string) => new DropDataWriter(ver)