import { ConfigTalentReader } from "./ConfigTalent"

export class ConfigTalentEquipReader extends ConfigTalentReader {
  constructor(ver: string) {
    super(ver, "/EquipTalents")
  }
}

export default (ver: string) => new ConfigTalentEquipReader(ver)
