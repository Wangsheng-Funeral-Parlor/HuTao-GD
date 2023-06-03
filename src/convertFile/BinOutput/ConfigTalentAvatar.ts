import { ConfigTalentReader } from "./ConfigTalent"

export class ConfigTalentAvatarReader extends ConfigTalentReader {
  constructor(ver: string) {
    super(ver, "/AvatarTalents")
  }
}

export default (ver: string) => new ConfigTalentAvatarReader(ver)
