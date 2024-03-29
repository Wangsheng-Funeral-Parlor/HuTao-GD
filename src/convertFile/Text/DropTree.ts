import DropTreeList from '$DT/Text/DropTree'
import Reader from './reader'

export class DropTreeReader extends Reader {
  declare data: DropTreeList

  constructor(ver: string) {
    super('DropTreeData', ver, [
      'DropId',
      'MinLevel',
      'MaxLevel',
      'Random',
      'Tier',
      'Leaf1Id',
      'Leaf1Count',
      'Leaf1Weight',
      'Leaf2Id',
      'Leaf2Count',
      'Leaf2Weight',
      'Leaf3Id',
      'Leaf3Count',
      'Leaf3Weight',
      'Leaf4Id',
      'Leaf4Count',
      'Leaf4Weight',
      'Leaf5Id',
      'Leaf5Count',
      'Leaf5Weight',
      'Leaf6Id',
      'Leaf6Count',
      'Leaf6Weight',
      'Leaf7Id',
      'Leaf7Count',
      'Leaf7Weight',
      'Leaf8Id',
      'Leaf8Count',
      'Leaf8Weight',
      'Leaf9Id',
      'Leaf9Count',
      'Leaf9Weight',
      'Leaf10Id',
      'Leaf10Count',
      'Leaf10Weight',
      'Leaf11Id',
      'Leaf11Count',
      'Leaf11Weight',
      'Leaf12Id',
      'Leaf12Count',
      'Leaf12Weight',
      'Leaf13Id',
      'Leaf13Count',
      'Leaf13Weight',
      'Leaf14Id',
      'Leaf14Count',
      'Leaf14Weight',
      'Leaf15Id',
      'Leaf15Count',
      'Leaf15Weight',
      'Leaf16Id',
      'Leaf16Count',
      'Leaf16Weight',
      'Leaf17Id',
      'Leaf17Count',
      'Leaf17Weight',
      'Leaf18Id',
      'Leaf18Count',
      'Leaf18Weight',
      'Leaf19Id',
      'Leaf19Count',
      'Leaf19Weight',
      'Leaf20Id',
      'Leaf20Count',
      'Leaf20Weight',
      'Leaf21Id',
      'Leaf21Count',
      'Leaf21Weight',
      'Leaf22Id',
      'Leaf22Count',
      'Leaf22Weight',
      'Leaf23Id',
      'Leaf23Count',
      'Leaf23Weight',
      'Leaf24Id',
      'Leaf24Count',
      'Leaf24Weight',
      'Leaf25Id',
      'Leaf25Count',
      'Leaf25Weight'
    ])
  }
}

export default (ver: string) => new DropTreeReader(ver)