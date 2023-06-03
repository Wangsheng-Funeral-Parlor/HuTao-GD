import ConfigScene from "#/BinOutput/ConfigScene"
import CityConfig from "#/ExcelBinOutput/CityConfig"
import SceneExcelConfig from "#/ExcelBinOutput/SceneExcelConfig"
import SceneTagConfig from "#/ExcelBinOutput/SceneTagConfig"
import Scene from "#/Script/Scene"
import SceneDataList from "$DT/SceneData"
import Writer from "./writer"

export class SceneDataWriter extends Writer {
  declare data: SceneDataList

  constructor(ver: string) {
    super("SceneData", ver)
  }

  async generateData(): Promise<void> {
    this.data = []

    const { version, data } = this

    const sceneExcelConfigLoader = SceneExcelConfig(version)
    const cityConfigLoader = CityConfig(version)
    const sceneTagConfigLoader = SceneTagConfig(version)
    const configSceneLoader = ConfigScene(version)
    const sceneScriptLoader = Scene(version)

    await sceneExcelConfigLoader.load()
    await cityConfigLoader.load()
    await sceneTagConfigLoader.load()
    await configSceneLoader.loadDir()
    await sceneScriptLoader.loadDir()

    const { data: sceneExcelConfig } = sceneExcelConfigLoader
    const { data: cityConfig } = cityConfigLoader
    const { data: sceneTagConfig } = sceneTagConfigLoader
    const { data: configScene } = configSceneLoader
    const { data: sceneScript } = sceneScriptLoader

    for (const scene of sceneExcelConfig) {
      const { Id, Type, SpecifiedAvatarList, MaxSpecifiedAvatarNum, IsMainScene, IsLocked } = scene

      if (sceneScript[Id] == null) continue

      const { Config, Group, Block } = sceneScript[Id]
      const { BeginPos, Size, BornPos, BornRot, DieY, VisionAnchor } = Config

      data.push({
        Id,
        Type,
        IsMainScene,
        IsLocked,
        BeginPos,
        Size,
        BornPos,
        BornRot,
        DieY,
        VisionAnchor,
        SpecifiedAvatarList: SpecifiedAvatarList || [],
        MaxSpecifiedAvatarNum: MaxSpecifiedAvatarNum || -1,
        City: cityConfig.map((city) => ({
          Id: city.CityId,
          AreaIdVec: city.AreaIdVec,
          MapPosX: city.MapPosX,
          MapPosY: city.MapPosY,
          AdventurePointId: city.AdventurePointId,
          OpenState: city.OpenState,
        })),
        Config: configScene[Id],
        Tag: sceneTagConfig
          .filter((tag) => tag.SceneId === Id)
          .map((tag) => ({
            Id: tag.Id,
            Name: tag.SceneTagName,
            Cond: tag.Cond.filter((cond) => cond.CondType != null) as {
              CondType: string
              Param1?: number
              Param2?: number
            }[],
            IsDefaultValid: !!tag.IsDefaultValid,
          })),
        Group: Group,
        Block: Block,
      })
    }
  }
}

export default (ver: string) => new SceneDataWriter(ver)
