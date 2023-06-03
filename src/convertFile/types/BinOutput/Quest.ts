export interface QuestData {
  Id: number
  ELEPLNPCHAA?: number
  Series?: number
  TitleTextMapHash?: number
  DescTextMapHash?: number
  LuaPath: string
  SuggestTrackMainQuestList?: number[]
  RewardIdList?: number[]
  ChapterId?: number
  ShowRedPoint?: boolean
  SubQuests?: SubQuest[]
  Talks?: Talk[]
  BPKCHMHEIEE?: number[]
  MLPLKFJDMIK?: number[]
  FreeStyleDic?: { [key: string]: number[] }
  Type?: QuestDatumType
  ShowType?: ShowType
  ForcePreloadLuaList?: number[]
  HBPBFHKEDLF?: number
  MainQuestTag?: MainQuestTag
  ActiveMode?: ActiveMode
  PreloadLuaList?: number[]
  DialogList?: DialogList[]
  SuggestTrackOutOfOrder?: boolean
  Repeatable?: boolean
  TaskID?: number
  ActivityId?: number
  RecommendLevel?: number
}

export enum ActiveMode {
  PlayModeAll = "PLAY_MODE_ALL",
  PlayModeHost = "PLAY_MODE_HOST",
}

export interface DialogList {
  id: number
  nextDialogs?: number[]
  talkRole: TalkRole
  talkContentTextMapHash?: number
  talkAssetPath: string
  talkAssetPathAlter: string
  talkAudioName: string
  actionBefore: string
  actionWhile: ActionWhile
  actionAfter: string
  optionIcon: string
  talkShowType?: TalkShowType
  talkRoleNameTextMapHash?: number
  showDuration?: number
}

export enum ActionWhile {
  Empty = "",
  SimpleTalkConfuse = "SimpleTalk/Confuse",
  SimpleTalkNodHead = "SimpleTalk/NodHead",
  SimpleTalkPutHand = "SimpleTalk/PutHand",
  SimpleTalkRandomTalk = "SimpleTalk/RandomTalk",
  SimpleTalkStandby = "SimpleTalk/Standby",
  SimpleTalkThink = "SimpleTalk/Think",
}

export interface TalkRole {
  Type?: TalkRoleType
  Id: string
}

export enum TalkRoleType {
  TalkRoleBlackScreen = "TALK_ROLE_BLACK_SCREEN",
  TalkRoleNeedClickBlackScreen = "TALK_ROLE_NEED_CLICK_BLACK_SCREEN",
  TalkRoleNpc = "TALK_ROLE_NPC",
  TalkRolePlayer = "TALK_ROLE_PLAYER",
}

export enum TalkShowType {
  TalkShowForceSelect = "TALK_SHOW_FORCE_SELECT",
}

export enum MainQuestTag {
  MainquestTagActivity = "MAINQUEST_TAG_ACTIVITY",
  MainquestTagGuide = "MAINQUEST_TAG_GUIDE",
  MainquestTagMainWq = "MAINQUEST_TAG_MAIN_WQ",
  MainquestTagRankZeroWq = "MAINQUEST_TAG_RANK_ZERO_WQ",
}

export enum ShowType {
  QuestHidden = "QUEST_HIDDEN",
}

export interface SubQuest {
  SubId: number
  MainId: number
  Order: number
  DescTextMapHash?: number
  FinishCond?: Cond[]
  Guide: Guide
  AcceptCondComb: AcceptCondComb
  IsRewind?: boolean
  VersionBegin: string
  VersionEnd: string
  IsMpBlock?: boolean
  SubIdSet?: number
  FinishExec?: FailExec[]
  ShowType?: ShowType
  BanType?: BanType
  FailCond?: Cond[]
  FinishParent?: boolean
  FailExec?: FailExec[]
  ShowGuide?: ShowGuide
  StepDescTextMapHash?: number
  FailParentShow?: ShowType
  GuideTipsTextMapHash?: number
  FailParent?: boolean
}

export interface AcceptCondComb {
  ODAOGCJFIHC: string
  Type?: AcceptCondCombType
}

export enum AcceptCondCombType {
  QuestGuideHintAranaraHandbookRecord = "QUEST_GUIDE_HINT_ARANARA_HANDBOOK_RECORD",
  QuestGuideHintDeshretManual = "QUEST_GUIDE_HINT_DESHRET_MANUAL",
  QuestGuideHintReadingDialog = "QUEST_GUIDE_HINT_READING_DIALOG",
}

export enum BanType {
  BanGroupCommon = "BAN_GROUP_COMMON",
  BanGroupTransporGotoScene = "BAN_GROUP_TRANSPOR_GOTO_SCENE",
  BanGroupTransportMap = "BAN_GROUP_TRANSPORT_MAP",
  BanGroupTransportOnly = "BAN_GROUP_TRANSPORT_ONLY",
}

export interface Cond {
  Type: FailCondType
  Param: number[]
  Count?: number
}

export enum FailCondType {
  QuestContentActivityTriggerFailed = "QUEST_CONTENT_ACTIVITY_TRIGGER_FAILED",
  QuestContentActivityTriggerUpdate = "QUEST_CONTENT_ACTIVITY_TRIGGER_UPDATE",
  QuestContentAddQuestProgress = "QUEST_CONTENT_ADD_QUEST_PROGRESS",
  QuestContentAnyManualTransport = "QUEST_CONTENT_ANY_MANUAL_TRANSPORT",
  QuestContentAvatarRenameComplete = "QUEST_CONTENT_AVATAR_RENAME_COMPLETE",
  QuestContentBargainFail = "QUEST_CONTENT_BARGAIN_FAIL",
  QuestContentBargainSucc = "QUEST_CONTENT_BARGAIN_SUCC",
  QuestContentCaptureUseMaterialList = "QUEST_CONTENT_CAPTURE_USE_MATERIAL_LIST",
  QuestContentCityLevelUp = "QUEST_CONTENT_CITY_LEVEL_UP",
  QuestContentClearGroupMonster = "QUEST_CONTENT_CLEAR_GROUP_MONSTER",
  QuestContentCompleteAnyTalk = "QUEST_CONTENT_COMPLETE_ANY_TALK",
  QuestContentCompleteTalk = "QUEST_CONTENT_COMPLETE_TALK",
  QuestContentDestroyGadget = "QUEST_CONTENT_DESTROY_GADGET",
  QuestContentEnterDungeon = "QUEST_CONTENT_ENTER_DUNGEON",
  QuestContentEnterMyHomeWorld = "QUEST_CONTENT_ENTER_MY_HOME_WORLD",
  QuestContentEnterMyWorld = "QUEST_CONTENT_ENTER_MY_WORLD",
  QuestContentEnterMyWorldScene = "QUEST_CONTENT_ENTER_MY_WORLD_SCENE",
  QuestContentEnterRogueDungeon = "QUEST_CONTENT_ENTER_ROGUE_DUNGEON",
  QuestContentEnterRoom = "QUEST_CONTENT_ENTER_ROOM",
  QuestContentEnterVehicle = "QUEST_CONTENT_ENTER_VEHICLE",
  QuestContentFailDungeon = "QUEST_CONTENT_FAIL_DUNGEON",
  QuestContentFinishDungeon = "QUEST_CONTENT_FINISH_DUNGEON",
  QuestContentFinishItemGiving = "QUEST_CONTENT_FINISH_ITEM_GIVING",
  QuestContentFinishPlot = "QUEST_CONTENT_FINISH_PLOT",
  QuestContentFishingSucc = "QUEST_CONTENT_FISHING_SUCC",
  QuestContentGadgetStateChange = "QUEST_CONTENT_GADGET_STATE_CHANGE",
  QuestContentGameTimeTick = "QUEST_CONTENT_GAME_TIME_TICK",
  QuestContentGcgGuideProgress = "QUEST_CONTENT_GCG_GUIDE_PROGRESS",
  QuestContentGcgLevelWin = "QUEST_CONTENT_GCG_LEVEL_WIN",
  QuestContentInteractGadget = "QUEST_CONTENT_INTERACT_GADGET",
  QuestContentIrodoriFinishFlowerCombination = "QUEST_CONTENT_IRODORI_FINISH_FLOWER_COMBINATION",
  QuestContentIrodoriPoetryFinishFillPoetry = "QUEST_CONTENT_IRODORI_POETRY_FINISH_FILL_POETRY",
  QuestContentIrodoriPoetryReachMinProgress = "QUEST_CONTENT_IRODORI_POETRY_REACH_MIN_PROGRESS",
  QuestContentItemLessThan = "QUEST_CONTENT_ITEM_LESS_THAN",
  QuestContentItemLessThanBargain = "QUEST_CONTENT_ITEM_LESS_THAN_BARGAIN",
  QuestContentLeaveScene = "QUEST_CONTENT_LEAVE_SCENE",
  QuestContentLeaveSceneRange = "QUEST_CONTENT_LEAVE_SCENE_RANGE",
  QuestContentLeaveSceneRangeAndRoom = "QUEST_CONTENT_LEAVE_SCENE_RANGE_AND_ROOM",
  QuestContentLuaNotify = "QUEST_CONTENT_LUA_NOTIFY",
  QuestContentMainCoopEnterAnySavePoint = "QUEST_CONTENT_MAIN_COOP_ENTER_ANY_SAVE_POINT",
  QuestContentMainCoopEnterSavePoint = "QUEST_CONTENT_MAIN_COOP_ENTER_SAVE_POINT",
  QuestContentMonsterDie = "QUEST_CONTENT_MONSTER_DIE",
  QuestContentNotFinishPlot = "QUEST_CONTENT_NOT_FINISH_PLOT",
  QuestContentNotUnlockedRecipe = "QUEST_CONTENT_NOT_UNLOCKED_RECIPE",
  QuestContentObtainItem = "QUEST_CONTENT_OBTAIN_ITEM",
  QuestContentObtainMaterialWithSubtype = "QUEST_CONTENT_OBTAIN_MATERIAL_WITH_SUBTYPE",
  QuestContentObtainVariousItem = "QUEST_CONTENT_OBTAIN_VARIOUS_ITEM",
  QuestContentPlayerLevelUp = "QUEST_CONTENT_PLAYER_LEVEL_UP",
  QuestContentQuestGlobalVarEqual = "QUEST_CONTENT_QUEST_GLOBAL_VAR_EQUAL",
  QuestContentQuestStateEqual = "QUEST_CONTENT_QUEST_STATE_EQUAL",
  QuestContentQuestStateNotEqual = "QUEST_CONTENT_QUEST_STATE_NOT_EQUAL",
  QuestContentQuestVarEqual = "QUEST_CONTENT_QUEST_VAR_EQUAL",
  QuestContentQuestVarGreater = "QUEST_CONTENT_QUEST_VAR_GREATER",
  QuestContentQuestVarLess = "QUEST_CONTENT_QUEST_VAR_LESS",
  QuestContentSceneLevelTagEq = "QUEST_CONTENT_SCENE_LEVEL_TAG_EQ",
  QuestContentSkill = "QUEST_CONTENT_SKILL",
  QuestContentTeamDead = "QUEST_CONTENT_TEAM_DEAD",
  QuestContentTimeVarGtEq = "QUEST_CONTENT_TIME_VAR_GT_EQ",
  QuestContentTimeVarPassDay = "QUEST_CONTENT_TIME_VAR_PASS_DAY",
  QuestContentTriggerFire = "QUEST_CONTENT_TRIGGER_FIRE",
  QuestContentUnlockTransPoint = "QUEST_CONTENT_UNLOCK_TRANS_POINT",
  QuestContentUnlockedRecipe = "QUEST_CONTENT_UNLOCKED_RECIPE",
  QuestContentUseItem = "QUEST_CONTENT_USE_ITEM",
  QuestContentUseWidget = "QUEST_CONTENT_USE_WIDGET",
}

export interface FailExec {
  Type?: FailExecType
  Param?: string[]
}

export enum FailExecType {
  QuestCondActivityClientCond = "QUEST_COND_ACTIVITY_CLIENT_COND",
  QuestCondAvatarFetterEq = "QUEST_COND_AVATAR_FETTER_EQ",
  QuestCondAvatarFetterGt = "QUEST_COND_AVATAR_FETTER_GT",
  QuestCondAvatarFetterLt = "QUEST_COND_AVATAR_FETTER_LT",
  QuestCondCityLevelEqualGreater = "QUEST_COND_CITY_LEVEL_EQUAL_GREATER",
  QuestCondDailyTaskInProgress = "QUEST_COND_DAILY_TASK_IN_PROGRESS",
  QuestCondDailyTaskRewardCanGet = "QUEST_COND_DAILY_TASK_REWARD_CAN_GET",
  QuestCondDailyTaskRewardReceived = "QUEST_COND_DAILY_TASK_REWARD_RECEIVED",
  QuestCondDailyTaskVarEq = "QUEST_COND_DAILY_TASK_VAR_EQ",
  QuestCondDailyTaskVarGt = "QUEST_COND_DAILY_TASK_VAR_GT",
  QuestCondDailyTaskVarLt = "QUEST_COND_DAILY_TASK_VAR_LT",
  QuestCondGcgWorldChallengeResult = "QUEST_COND_GCG_WORLD_CHALLENGE_RESULT",
  QuestCondHitKeywordEasterEgg = "QUEST_COND_HIT_KEYWORD_EASTER_EGG",
  QuestCondIsDaytime = "QUEST_COND_IS_DAYTIME",
  QuestCondItemGivingActived = "QUEST_COND_ITEM_GIVING_ACTIVED",
  QuestCondItemGivingFinished = "QUEST_COND_ITEM_GIVING_FINISHED",
  QuestCondItemNumLessThan = "QUEST_COND_ITEM_NUM_LESS_THAN",
  QuestCondLuaNotify = "QUEST_COND_LUA_NOTIFY",
  QuestCondNotHaveBlossomTalk = "QUEST_COND_NOT_HAVE_BLOSSOM_TALK",
  QuestCondOpenStateEqual = "QUEST_COND_OPEN_STATE_EQUAL",
  QuestCondPackHaveItem = "QUEST_COND_PACK_HAVE_ITEM",
  QuestCondPlayerChooseMale = "QUEST_COND_PLAYER_CHOOSE_MALE",
  QuestCondQuestGlobalVarEqual = "QUEST_COND_QUEST_GLOBAL_VAR_EQUAL",
  QuestCondQuestGlobalVarGreater = "QUEST_COND_QUEST_GLOBAL_VAR_GREATER",
  QuestCondQuestGlobalVarLess = "QUEST_COND_QUEST_GLOBAL_VAR_LESS",
  QuestCondQuestNotReceive = "QUEST_COND_QUEST_NOT_RECEIVE",
  QuestCondQuestVarEqual = "QUEST_COND_QUEST_VAR_EQUAL",
  QuestCondQuestVarGreater = "QUEST_COND_QUEST_VAR_GREATER",
  QuestCondQuestVarLess = "QUEST_COND_QUEST_VAR_LESS",
  QuestCondSceneLevelTagEq = "QUEST_COND_SCENE_LEVEL_TAG_EQ",
  QuestCondStateEqual = "QUEST_COND_STATE_EQUAL",
  QuestCondStateNotEqual = "QUEST_COND_STATE_NOT_EQUAL",
  QuestCondTmpvalueHitNickname = "QUEST_COND_TMPVALUE_HIT_NICKNAME",
  QuestExecActiveActivityCondState = "QUEST_EXEC_ACTIVE_ACTIVITY_COND_STATE",
  QuestExecActiveItemGiving = "QUEST_EXEC_ACTIVE_ITEM_GIVING",
  QuestExecAddCurAvatarEnergy = "QUEST_EXEC_ADD_CUR_AVATAR_ENERGY",
  QuestExecAddQuestProgress = "QUEST_EXEC_ADD_QUEST_PROGRESS",
  QuestExecAddSceneTag = "QUEST_EXEC_ADD_SCENE_TAG",
  QuestExecChangeAvatarElemet = "QUEST_EXEC_CHANGE_AVATAR_ELEMET",
  QuestExecChangeMapAreaState = "QUEST_EXEC_CHANGE_MAP_AREA_STATE",
  QuestExecChangeSceneLevelTag = "QUEST_EXEC_CHANGE_SCENE_LEVEL_TAG",
  QuestExecChangeSkillDepot = "QUEST_EXEC_CHANGE_SKILL_DEPOT",
  QuestExecClearTimeVar = "QUEST_EXEC_CLEAR_TIME_VAR",
  QuestExecDECQuestVar = "QUEST_EXEC_DEC_QUEST_VAR",
  QuestExecDeactiveItemGiving = "QUEST_EXEC_DEACTIVE_ITEM_GIVING",
  QuestExecDelAllSpecificPackItem = "QUEST_EXEC_DEL_ALL_SPECIFIC_PACK_ITEM",
  QuestExecDelPackItem = "QUEST_EXEC_DEL_PACK_ITEM",
  QuestExecDelPackItemBatch = "QUEST_EXEC_DEL_PACK_ITEM_BATCH",
  QuestExecDelSceneTag = "QUEST_EXEC_DEL_SCENE_TAG",
  QuestExecGrantTrialAvatar = "QUEST_EXEC_GRANT_TRIAL_AVATAR",
  QuestExecGrantTrialAvatarAndLockTeam = "QUEST_EXEC_GRANT_TRIAL_AVATAR_AND_LOCK_TEAM",
  QuestExecHideScenePoint = "QUEST_EXEC_HIDE_SCENE_POINT",
  QuestExecInactiveActivityCondState = "QUEST_EXEC_INACTIVE_ACTIVITY_COND_STATE",
  QuestExecIncDailyTaskVar = "QUEST_EXEC_INC_DAILY_TASK_VAR",
  QuestExecIncQuestGlobalVar = "QUEST_EXEC_INC_QUEST_GLOBAL_VAR",
  QuestExecIncQuestVar = "QUEST_EXEC_INC_QUEST_VAR",
  QuestExecInitTimeVar = "QUEST_EXEC_INIT_TIME_VAR",
  QuestExecLockAvatarTeam = "QUEST_EXEC_LOCK_AVATAR_TEAM",
  QuestExecLockPoint = "QUEST_EXEC_LOCK_POINT",
  QuestExecModifyAranaraCollectionState = "QUEST_EXEC_MODIFY_ARANARA_COLLECTION_STATE",
  QuestExecModifyClimateArea = "QUEST_EXEC_MODIFY_CLIMATE_AREA",
  QuestExecModifyWeatherArea = "QUEST_EXEC_MODIFY_WEATHER_AREA",
  QuestExecNotifyDailyTask = "QUEST_EXEC_NOTIFY_DAILY_TASK",
  QuestExecNotifyGroupLua = "QUEST_EXEC_NOTIFY_GROUP_LUA",
  QuestExecOptionalRevivalTeam = "QUEST_EXEC_OPTIONAL_REVIVAL_TEAM",
  QuestExecRandomQuestVar = "QUEST_EXEC_RANDOM_QUEST_VAR",
  QuestExecRefreshGroupMonster = "QUEST_EXEC_REFRESH_GROUP_MONSTER",
  QuestExecRefreshGroupSuite = "QUEST_EXEC_REFRESH_GROUP_SUITE",
  QuestExecRefreshGroupSuiteRandom = "QUEST_EXEC_REFRESH_GROUP_SUITE_RANDOM",
  QuestExecRefreshWorldQuestFlowGroupSuite = "QUEST_EXEC_REFRESH_WORLD_QUEST_FLOW_GROUP_SUITE",
  QuestExecRegisterDynamicGroup = "QUEST_EXEC_REGISTER_DYNAMIC_GROUP",
  QuestExecRegisterDynamicGroupOnly = "QUEST_EXEC_REGISTER_DYNAMIC_GROUP_ONLY",
  QuestExecReloadSceneTag = "QUEST_EXEC_RELOAD_SCENE_TAG",
  QuestExecRemoveTrialAvatar = "QUEST_EXEC_REMOVE_TRIAL_AVATAR",
  QuestExecRollbackParentQuest = "QUEST_EXEC_ROLLBACK_PARENT_QUEST",
  QuestExecRollbackQuest = "QUEST_EXEC_ROLLBACK_QUEST",
  QuestExecSetDailyTaskVar = "QUEST_EXEC_SET_DAILY_TASK_VAR",
  QuestExecSetGameTime = "QUEST_EXEC_SET_GAME_TIME",
  QuestExecSetIsFlyable = "QUEST_EXEC_SET_IS_FLYABLE",
  QuestExecSetIsGameTimeLocked = "QUEST_EXEC_SET_IS_GAME_TIME_LOCKED",
  QuestExecSetIsWeatherLocked = "QUEST_EXEC_SET_IS_WEATHER_LOCKED",
  QuestExecSetOpenState = "QUEST_EXEC_SET_OPEN_STATE",
  QuestExecSetQuestGlobalVar = "QUEST_EXEC_SET_QUEST_GLOBAL_VAR",
  QuestExecSetQuestVar = "QUEST_EXEC_SET_QUEST_VAR",
  QuestExecSetWeatherGadget = "QUEST_EXEC_SET_WEATHER_GADGET",
  QuestExecStopBargain = "QUEST_EXEC_STOP_BARGAIN",
  QuestExecUnhideScenePoint = "QUEST_EXEC_UNHIDE_SCENE_POINT",
  QuestExecUnlockArea = "QUEST_EXEC_UNLOCK_AREA",
  QuestExecUnlockAvatarTeam = "QUEST_EXEC_UNLOCK_AVATAR_TEAM",
  QuestExecUnlockAvatarTeamV2 = "QUEST_EXEC_UNLOCK_AVATAR_TEAM_V2",
  QuestExecUnlockPoint = "QUEST_EXEC_UNLOCK_POINT",
  QuestExecUnregisterDynamicGroup = "QUEST_EXEC_UNREGISTER_DYNAMIC_GROUP",
  QuestExecUpdateParentQuestRewardIndex = "QUEST_EXEC_UPDATE_PARENT_QUEST_REWARD_INDEX",
  TalkExecDECQuestGlobalVar = "TALK_EXEC_DEC_QUEST_GLOBAL_VAR",
  TalkExecDECQuestVar = "TALK_EXEC_DEC_QUEST_VAR",
  TalkExecIncDailyTaskVar = "TALK_EXEC_INC_DAILY_TASK_VAR",
  TalkExecIncQuestGlobalVar = "TALK_EXEC_INC_QUEST_GLOBAL_VAR",
  TalkExecIncQuestVar = "TALK_EXEC_INC_QUEST_VAR",
  TalkExecNotifyGroupLua = "TALK_EXEC_NOTIFY_GROUP_LUA",
  TalkExecSaveTalkID = "TALK_EXEC_SAVE_TALK_ID",
  TalkExecSetDailyTaskVar = "TALK_EXEC_SET_DAILY_TASK_VAR",
  TalkExecSetGameTime = "TALK_EXEC_SET_GAME_TIME",
  TalkExecSetQuestGlobalVar = "TALK_EXEC_SET_QUEST_GLOBAL_VAR",
  TalkExecSetQuestVar = "TALK_EXEC_SET_QUEST_VAR",
  TalkExecTransSceneDummyPoint = "TALK_EXEC_TRANS_SCENE_DUMMY_POINT",
}

export interface Guide {
  Type?: GuideType
  Param?: string[]
  GuideScene?: number
  GuideStyle?: GuideStyle
  GuideLayer?: GuideLayer
  AutoGuide?: AutoGuide
}

export enum AutoGuide {
  QuestGuideAutoDisable = "QUEST_GUIDE_AUTO_DISABLE",
  QuestGuideAutoEnable = "QUEST_GUIDE_AUTO_ENABLE",
}

export enum GuideLayer {
  QuestGuideLayerScene = "QUEST_GUIDE_LAYER_SCENE",
  QuestGuideLayerUI = "QUEST_GUIDE_LAYER_UI",
}

export enum GuideStyle {
  QuestGuideStyleFinish = "QUEST_GUIDE_STYLE_FINISH",
  QuestGuideStylePoint = "QUEST_GUIDE_STYLE_POINT",
  QuestGuideStyleStart = "QUEST_GUIDE_STYLE_START",
  QuestGuideStyleTarget = "QUEST_GUIDE_STYLE_TARGET",
}

export enum GuideType {
  QuestGuideGadget = "QUEST_GUIDE_GADGET",
  QuestGuideLocation = "QUEST_GUIDE_LOCATION",
  QuestGuideNpc = "QUEST_GUIDE_NPC",
  QuestGuideShowOrHideNpc = "QUEST_GUIDE_SHOW_OR_HIDE_NPC",
}

export enum ShowGuide {
  QuestGuideItemDisable = "QUEST_GUIDE_ITEM_DISABLE",
  QuestGuideItemMoveHide = "QUEST_GUIDE_ITEM_MOVE_HIDE",
}

export interface Talk {
  Id: number
  BeginWay?: BeginWay
  BeginCond?: FailExec[]
  Priority?: number
  InitDialog?: number
  NpcId?: number[]
  PerformCfg: string
  HeroTalk?: HeroTalk
  QuestId: number
  AssetIndex: number
  PrePerformCfg: PrePerformCFG
  BeginCondComb?: BeginCondComb
  NextTalks?: number[]
  ONJHDOMNFOJ?: number[]
  DontBlockDaily?: boolean
  ActiveMode?: ActiveMode
  LockGameTime?: boolean
  QuestIdleTalk?: boolean
  LowPriority?: boolean
  StayFreeStyle?: boolean
  FinishExec?: FailExec[]
  EnableCameraDisplacement?: boolean
  PKKCHKIMBDM?: number[]
  NBCNFGJKLMG?: boolean
  TalkMarkType?: TalkMarkType
  FNOOFAGOKMN?: number
  NBJPAMCNCKC?: number
  FIHPIKGEAGK?: number[]
  ParticipantId?: number[]
  IJIOLOCLAAC?: number[]
  AKHDPOJKBNK?: number[]
}

export enum BeginCondComb {
  LogicAAndBAndEtcor = "LOGIC_A_AND_B_AND_ETCOR",
  LogicAAndBOrEtcand = "LOGIC_A_AND_B_OR_ETCAND",
  LogicAAndEtcor = "LOGIC_A_AND_ETCOR",
  LogicAOrBOrEtcand = "LOGIC_A_OR_B_OR_ETCAND",
  LogicAOrEtcand = "LOGIC_A_OR_ETCAND",
  LogicAnd = "LOGIC_AND",
  LogicOr = "LOGIC_OR",
}

export enum BeginWay {
  TalkBeginAuto = "TALK_BEGIN_AUTO",
  TalkBeginManual = "TALK_BEGIN_MANUAL",
}

export enum HeroTalk {
  TalkHeroMain = "TALK_HERO_MAIN",
}

export enum PrePerformCFG {
  Empty = "",
  QuestDialogueCOOPCoopBarbaraTest3 = "QuestDialogue/COOP/CoopBarbara/test3",
  QuestDialogueWQMengde70824Q70824Talk = "QuestDialogue/WQ/Mengde_70824/Q70824_Talk",
}

export enum TalkMarkType {
  TalkMarkCommon = "TALK_MARK_COMMON",
  TalkMarkHide = "TALK_MARK_HIDE",
}

export enum QuestDatumType {
  Eq = "EQ",
  Iq = "IQ",
  Lq = "LQ",
  Wq = "WQ",
}
