import EntityDropSubfieldList from "$DT/Text/EntityDropSubfield"
import Reader from "./reader"

export class EntityDropSubfieldReader extends Reader {
  declare data: EntityDropSubfieldList

  constructor(ver: string) {
    super("EntityDropSubfieldData", ver, [
      "EntityId",
      "Type",
      "Branch1Type",
      "Branch1SubfieldId",
      "Branch2Type",
      "Branch2SubfieldId",
      "Branch3Type",
      "Branch3SubfieldId",
      "Branch4Type",
      "Branch4SubfieldId",
      "Branch5Type",
      "Branch5SubfieldId",
      "Branch6Type",
      "Branch6SubfieldId",
      "Branch7Type",
      "Branch7SubfieldId",
      "Limit",
    ])
  }
}

export default (ver: string) => new EntityDropSubfieldReader(ver)
