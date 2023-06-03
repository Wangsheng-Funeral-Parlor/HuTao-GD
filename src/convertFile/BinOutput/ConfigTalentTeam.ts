import { ConfigTalentReader } from "./ConfigTalent"

export class ConfigTalentTeamReader extends ConfigTalentReader {
  constructor(ver: string) {
    super(ver, "/TeamTalents")
  }
}

export default (ver: string) => new ConfigTalentTeamReader(ver)
