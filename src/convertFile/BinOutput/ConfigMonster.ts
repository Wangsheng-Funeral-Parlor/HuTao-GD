import MonsterConfig from '#/types/BinOutput/ConfigMonster'
import Reader from './reader'

export class ConfigMonsterReader extends Reader {
  declare data: { [name: string]: MonsterConfig }

  constructor(ver: string) {
    super('Monster', ver)
  }

  async loadDir(): Promise<void> {
    await super.loadDir()

    // Remap file name to monster name
    const { data } = this
    this.data = Object.fromEntries(
      Object.entries(data)
        .filter(e => e[0].indexOf('ConfigAnimal_') === 0 || e[0].indexOf('ConfigMonster_') === 0)
        .map(e => [
          e[0].match(/(?<=^Config(Animal|Monster).*?_).*$/)?.[0] || 'unknown',
          e[1]
        ])
    )
  }
}

export default (ver: string) => new ConfigMonsterReader(ver)