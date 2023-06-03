import MonsterDropList from "$DT/Text/MonsterDrop"
import Reader from "./reader"

export class MonsterDropReader extends Reader {
  declare data: MonsterDropList

  constructor(ver: string) {
    super("MonsterDropData", ver, ["MinLevel", "Index", "DropId", "DropCount"])
  }
}

export default (ver: string) => new MonsterDropReader(ver)
