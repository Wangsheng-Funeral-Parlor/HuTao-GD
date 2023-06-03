import ConfigMonster from "$DT/BinOutput/Config/ConfigMonster"
import getRecurName from "@/utils/getRecurName"
import Reader from "./reader"

export class ConfigMonsterReader extends Reader {
  declare data: { [name: string]: ConfigMonster }

  constructor(ver: string) {
    super("Monster", ver)
  }

  getName(name: string, monsterConfig: ConfigMonster): string {
    if (!name.match(/^[0-9a-f]{8}$/)) return name
    return (
      getRecurName(
        monsterConfig?.Abilities?.map((ability) => ability?.AbilityName),
        ["Monster", "Animal"]
      ) || name
    )
  }

  async loadDir(): Promise<void> {
    await super.loadDir()

    // Remap file name to monster name
    const { data } = this
    this.data = Object.fromEntries(
      Object.entries(data).map((e) => [
        e[0].match(/(?<=^Config(Animal|Monster).*?_).*$/)?.[0] || this.getName(e[0], e[1]),
        e[1],
      ])
    )
  }
}

export default (ver: string) => new ConfigMonsterReader(ver)
