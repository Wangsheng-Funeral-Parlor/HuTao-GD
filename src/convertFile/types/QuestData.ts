import { QuestDatumType, SubQuest, Talk } from "./BinOutput/Quest"

export interface QuestData {
  Id: number
  Series: number
  ChapterId: number
  Type: QuestDatumType
  Talks: Talk[]
  SubQuests: SubQuest[]
}

export default interface QuestDataGroup {
  Quest: QuestData[]
}
