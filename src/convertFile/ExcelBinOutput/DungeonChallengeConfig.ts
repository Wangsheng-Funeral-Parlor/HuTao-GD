import DungeonChallengeConfigList from "$DT/ExcelBinOutput/DungeonChallengeConfig"
import Reader from "./reader"

export class DungeonChallengeConfigReader extends Reader {
  declare data: DungeonChallengeConfigList

  constructor(ver: string) {
    super("DungeonChallengeConfigData", ver)
  }
}

export default (ver: string) => new DungeonChallengeConfigReader(ver)
