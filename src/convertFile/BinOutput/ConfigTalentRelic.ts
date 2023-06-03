import { ConfigTalentReader } from "./ConfigTalent"

export class ConfigTalentRelicReader extends ConfigTalentReader {
  constructor(ver: string) {
    super(ver, "/RelicTalents")
  }
}

export default (ver: string) => new ConfigTalentRelicReader(ver)
