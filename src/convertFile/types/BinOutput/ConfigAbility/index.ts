import ActionConfig from './Action'
import MixinConfig from './Mixin'

export default interface AbilityConfig {
  Default: {
    $type: string
    AbilityName: string
    AbilityMixins: MixinConfig[]
    AbilitySpecials?: {
      [key: string]: number
    }
    Modifiers?: {
      [name: string]: {
        Stacking?: string
        ModifierName: string
        IsUnique?: boolean
        Duration?: number | string
        ElementType?: string
        ElementDurability: number
        ThinkInterval?: number
        ModifierMixins?: MixinConfig[]
        Properties?: { [key: string]: number }
        State?: string

        OnAdded?: ActionConfig[]
        OnRemoved?: ActionConfig[]
        OnThinkInterval?: ActionConfig[]
        OnAttackLanded?: ActionConfig[]
        OnBeingHit?: ActionConfig[]
        OnKill?: ActionConfig[]
      }
    }
    OnAdded?: ActionConfig[]
    OnRemoved?: ActionConfig[]
    OnAbilityStart?: ActionConfig[]
    OnKill?: ActionConfig[]
    IsDynamicAbility?: boolean
  }
}