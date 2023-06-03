import DropSubfieldList from "$DT/Text/DropSubfield"
import Reader from "./reader"

export class DropSubfieldReader extends Reader {
  declare data: DropSubfieldList

  constructor(ver: string) {
    super("DropSubfieldData", ver, ["Id", "MaxLevel", "DropId"])
  }
}

export default (ver: string) => new DropSubfieldReader(ver)
