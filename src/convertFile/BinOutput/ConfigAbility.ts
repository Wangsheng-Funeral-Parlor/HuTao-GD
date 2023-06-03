import Reader from "./reader"
import ConfigAbility from "$DT/BinOutput/Config/ConfigAbility"
import getRecurName from "@/utils/getRecurName"

export class ConfigAbilityReader extends Reader {
  declare data: { [name: string]: { [override: string]: ConfigAbility }[] }

  prefix: string

  constructor(ver: string, extra = "", prefix?: string) {
    super("Ability" + extra, ver)

    this.prefix = prefix
  }

  getName(name: string, abilityConfig: { [override: string]: ConfigAbility }[]): string {
    if (!name.match(/^[0-9a-f]{8}$/)) return name
    return (
      getRecurName(
        abilityConfig.map((ability) => ability?.Default?.AbilityName),
        this.prefix
      ) || name
    )
  }

  async loadDir(): Promise<void> {
    await super.loadDir()

    // Remap file name to ability name
    const { data } = this
    this.data = Object.fromEntries(
      Object.entries(data).map((e) => [
        e[0].match(/(?<=^ConfigAbility_).*$/)?.[0]?.replace(this.prefix + "_", "") || this.getName(e[0], e[1]),
        e[1],
      ])
    )
  }
}

export default (ver: string) => new ConfigAbilityReader(ver)
