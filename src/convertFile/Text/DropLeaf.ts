import DropLeafList from "$DT/Text/DropLeaf"
import Reader from "./reader"

export class DropLeafReader extends Reader {
  declare data: DropLeafList

  constructor(ver: string) {
    super("DropLeafData", ver, [
      "LeafId",
      "MinLevel",
      "MaxLevel",
      "Random",
      "Item1Id",
      "Item1Weight",
      "Item1Interval",
      "Item2Id",
      "Item2Weight",
      "Item2Interval",
      "Item3Id",
      "Item3Weight",
      "Item3Interval",
      "Item4Id",
      "Item4Weight",
      "Item4Interval",
      "Item5Id",
      "Item5Weight",
      "Item5Interval",
      "Item6Id",
      "Item6Weight",
      "Item6Interval",
      "Item7Id",
      "Item7Weight",
      "Item7Interval",
      "Item8Id",
      "Item8Weight",
      "Item8Interval",
      "Item9Id",
      "Item9Weight",
      "Item9Interval",
      "Item10Id",
      "Item10Weight",
      "Item10Interval",
    ])
  }
}

export default (ver: string) => new DropLeafReader(ver)
