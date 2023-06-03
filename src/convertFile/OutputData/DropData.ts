import ChestDrop from "#/Text/ChestDrop"
import DropLeaf from "#/Text/DropLeaf"
import DropSubfield from "#/Text/DropSubfield"
import DropTree from "#/Text/DropTree"
import EntityDropSubfield from "#/Text/EntityDropSubfield"
import MonsterDrop from "#/Text/MonsterDrop"
import DropDataGroup from "$DT/DropData"
import Writer from "./writer"

export class DropDataWriter extends Writer {
  declare data: DropDataGroup

  constructor(ver: string) {
    super("DropData", ver)
  }

  async generateData(): Promise<void> {
    // NOSONAR I don't fucking care
    this.data = {
      Subfield: [],
      Tree: [],
      Leaf: [],
      Entity: [],
      Chest: [],
      Monster: [],
    }

    const { data, version } = this

    const dropSubfieldTxtLoader = DropSubfield(version)
    const dropTreeTxtLoader = DropTree(version)
    const dropLeafTxtLoader = DropLeaf(version)
    const entityDropSubfieldTxtLoader = EntityDropSubfield(version)
    const chestDropTxtLoader = ChestDrop(version)
    const monsterDropTxtLoader = MonsterDrop(version)

    await dropSubfieldTxtLoader.load()
    await dropTreeTxtLoader.load()
    await dropLeafTxtLoader.load()
    await entityDropSubfieldTxtLoader.load()
    await chestDropTxtLoader.load()
    await monsterDropTxtLoader.load()

    const { data: dropSubfieldTxt } = dropSubfieldTxtLoader
    const { data: dropTreeTxt } = dropTreeTxtLoader
    const { data: dropLeafTxt } = dropLeafTxtLoader
    const { data: entityDropSubfieldTxt } = entityDropSubfieldTxtLoader
    const { data: chestDropTxt } = chestDropTxtLoader
    const { data: monsterDropTxt } = monsterDropTxtLoader

    for (const dropSubfield of dropSubfieldTxt) {
      const { Id, MaxLevel, DropId } = dropSubfield

      data.Subfield.push({
        Id: parseInt(Id) || 0,
        MaxLevel: parseInt(MaxLevel) || 0,
        DropId: parseInt(DropId) || 0,
      })
    }

    for (const dropTree of dropTreeTxt) {
      const { DropId, MinLevel, MaxLevel, Random, Tier } = dropTree

      const leafList = []
      const leafEntries = Object.entries(dropTree).filter((e) => e[0].match(/Leaf\d+(Id|Count|Weight)/))

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
        Leaf: leafList.filter((e) => e.Id),
      })
    }

    for (const dropLeaf of dropLeafTxt) {
      const { LeafId, MinLevel, MaxLevel, Random } = dropLeaf

      const itemList = []
      const itemEntries = Object.entries(dropLeaf).filter((e) => e[0].match(/Item\d+(Id|Weight|Interval)/))

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
        Item: itemList.filter((e) => e.Id),
      })
    }

    for (const entityDropSubfield of entityDropSubfieldTxt) {
      const { EntityId, Type, Limit } = entityDropSubfield

      const branchList = []
      const branchEntries = Object.entries(entityDropSubfield).filter((e) => e[0].match(/Branch\d+(Type|SubfieldId)/))

      for (const branchEntry of branchEntries) {
        const index = (parseInt(branchEntry[0].match(/\d+/)?.[0]) || 0) - 1
        const key = branchEntry[0].match(/(?<=Branch\d+).*/)?.[0]
        if (index < 0 || key == null) continue

        branchList[index] = branchList[index] || {}
        branchList[index][key] = key === "Type" ? branchEntry[1] : parseInt(branchEntry[1]) || 0
      }

      data.Entity.push({
        EntityId: parseInt(EntityId) || 0,
        Type: parseInt(Type) || 0,
        Branch: branchList.filter((e) => e.Type),
        Limit: parseInt(Limit) || 0,
      })
    }

    for (const chestDrop of chestDropTxt) {
      const { MinLevel, Index, DropId, DropCount, SourceType, Category } = chestDrop

      data.Chest.push({
        MinLevel: parseInt(MinLevel) || 0,
        Index,
        DropId: parseInt(DropId) || 0,
        DropCount: parseInt(DropCount) || 0,
        SourceType: parseInt(SourceType) || 0,
        Category,
      })
    }

    for (const monsterDrop of monsterDropTxt) {
      const { MinLevel, Index, DropId, DropCount } = monsterDrop

      data.Monster.push({
        MinLevel: parseInt(MinLevel) || 0,
        Index,
        DropId: parseInt(DropId) || 0,
        DropCount: parseInt(DropCount) || 0,
      })
    }
  }
}

export default (ver: string) => new DropDataWriter(ver)
