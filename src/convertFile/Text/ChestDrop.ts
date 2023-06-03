import ChestDropList from "$DT/Text/ChestDrop"
import Reader from "./reader"

export class ChestDropReader extends Reader {
  declare data: ChestDropList

  constructor(ver: string) {
    super("ChestDropData", ver, ["MinLevel", "Index", "DropId", "DropCount", "SourceType", "Category"])
  }
}

export default (ver: string) => new ChestDropReader(ver)
