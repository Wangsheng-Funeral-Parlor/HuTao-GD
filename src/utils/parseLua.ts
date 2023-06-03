import luaparse from "luaparse"
import { waitTick } from "./asyncWait"
import { GadgetStateEnum } from "$DT/Enum/GadgetState"
import { EventTypeEnum } from "$DT/Enum/EventType"

function isLuaArray(obj: any): boolean {
  const keys = Object.keys(obj || {})
    .map((k) => parseInt(k))
    .sort((a, b) => a - b)
  const len = keys.length

  for (let i = 0; i < len; i++) {
    const k = keys[i]
    if (isNaN(k) || k !== i + 1) return false
  }

  return true
}

export interface LuaObject {
  type: string
}

export interface LuaLabelStatement extends LuaObject {
  label: LuaIdentifier
}

export type LuaBreakStatement = LuaObject

export interface LuaGotoStatement extends LuaObject {
  label: LuaIdentifier
}

export interface LuaReturnStatement extends LuaObject {
  arguments: LuaObject[]
}

export interface LuaIfStatement extends LuaObject {
  clauses: LuaObject[]
}

export interface LuaIfClause extends LuaObject {
  condition: LuaObject
  body: LuaObject[]
}

export interface LuaElseifClause extends LuaObject {
  condition: LuaObject
  body: LuaObject[]
}

export interface LuaElseClause extends LuaObject {
  body: LuaObject[]
}

export interface LuaWhileStatement extends LuaObject {
  condition: LuaObject
  body: LuaObject[]
}

export interface LuaDoStatement extends LuaObject {
  body: LuaObject[]
}

export interface LuaRepeatStatement extends LuaObject {
  condition: LuaObject
  body: LuaObject[]
}

export interface LuaLocalStatement extends LuaObject {
  variables: LuaObject[]
  init: LuaObject[]
}

export interface LuaAssignmentStatement extends LuaObject {
  variables: LuaObject[]
  init: LuaObject[]
}

export interface LuaCallStatement extends LuaObject {
  expression: LuaObject
}

export interface LuaFunctionDeclaration extends LuaObject {
  identifier: string
  isLocal: boolean
  parameters: LuaIdentifier[]
  body: LuaObject[]
}

export interface LuaForNumericStatement extends LuaObject {
  variable: LuaIdentifier
  start: LuaObject
  end: LuaObject
  step: LuaObject
  body: LuaObject[]
}

export interface LuaForGenericStatement extends LuaObject {
  variables: LuaIdentifier[]
  iterators: LuaObject[]
  body: LuaObject[]
}

export interface LuaChunk extends LuaObject {
  body: LuaObject[]
  comments?: LuaComment[]
}

export interface LuaIdentifier extends LuaObject {
  name: string
}

export interface LuaLiteral extends LuaObject {
  value: any
  raw: string
}

export interface LuaStringLiteral extends LuaLiteral {
  value: string
}

export interface LuaNumericLiteral extends LuaLiteral {
  value: number
}

export interface LuaBooleanLiteral extends LuaLiteral {
  value: boolean
}

export type LuaNilLiteral = LuaLiteral

export type LuaVarargLiteral = LuaLiteral

export interface LuaTableKey extends LuaObject {
  key: LuaObject
  value: LuaObject
}

export interface LuaTableKeyString extends LuaObject {
  key: LuaIdentifier
  value: LuaObject
}

export interface LuaTableValue extends LuaObject {
  value: LuaObject
}

export interface LuaTableConstructorExpression extends LuaObject {
  fields: LuaObject[]
}

export interface LuaBinaryExpression extends LuaObject {
  operator: string
  left: LuaObject
  right: LuaObject
}

export type LuaLogicalExpression = LuaBinaryExpression

export interface LuaUnaryExpression extends LuaObject {
  operator: string
  argument: LuaObject
}

export interface LuaMemberExpression extends LuaObject {
  indexer: string
  identifier: LuaObject
  base: LuaObject
}

export interface LuaIndexExpression extends LuaObject {
  base: LuaObject
  index: LuaObject
}

export interface LuaCallExpression extends LuaObject {
  base: LuaObject
  arguments: LuaObject[]
}

export interface LuaTableCallExpression extends LuaObject {
  base: LuaObject
  arguments: LuaObject[]
  argument: LuaObject
}

export interface LuaStringCallExpression extends LuaObject {
  base: LuaObject
  argument: LuaObject
}

export interface LuaComment extends LuaObject {
  value: string
  raw: string
}

export class VariableManager {
  isGlobal: boolean
  globalVars: VariableManager
  parentVars: VariableManager
  varMap: { [name: string]: Variable }

  constructor(globalVars?: VariableManager, parentVars?: VariableManager) {
    this.isGlobal = globalVars == null
    this.globalVars = globalVars || this
    this.parentVars = parentVars
    this.varMap = {}
  }

  get(identifier: string): Variable {
    const { isGlobal, globalVars, parentVars, varMap } = this
    return varMap[identifier] || parentVars?.get(identifier) || (isGlobal ? null : globalVars.get(identifier)) || null
  }

  declare(identifier: string, local = false): Variable {
    const { isGlobal, globalVars, varMap } = this
    if (!isGlobal && !local) return globalVars.declare(identifier)

    const varObj = new Variable()
    varMap[identifier] = varObj
    return varObj
  }

  assign(identifier: string | LuaObject, init?: LuaObject, local = false) {
    let varObj: Variable

    if (typeof identifier !== "string") {
      switch (identifier.type) {
        case "Identifier":
          identifier = <string>parseLuaObj(identifier, this, true)
          varObj = this.get(identifier) || this.declare(identifier, local)
          break
        case "MemberExpression":
        case "IndexExpression": {
          const baseVarObj = this.get(
            parseLuaObj((<LuaMemberExpression | LuaIndexExpression>identifier).base, this, true)
          )
          if (baseVarObj == null) break
          identifier = parseLuaObj(
            identifier.type === "MemberExpression"
              ? (<LuaMemberExpression>identifier).identifier
              : (<LuaIndexExpression>identifier).index,
            this,
            true
          )
          varObj =
            baseVarObj.getMember(<string | number>identifier) || baseVarObj.declareMember(<string | number>identifier)
          break
        }
        default:
          identifier = null
      }
    } else {
      varObj = this.get(identifier) || this.declare(identifier, local)
    }

    if (!varObj) return console.log("[ERROR]", "Cannot assign to undeclared variable:", identifier)

    // init var with value
    if (init) varObj.set(parseLuaObj(init, this))

    return varObj
  }

  export() {
    return Object.fromEntries(Object.entries(this.varMap).map((e) => [e[0], e[1].export()]))
  }
}

export class Variable {
  private value: any

  constructor() {
    this.value = null
  }

  get() {
    return this.value
  }

  set(v: any) {
    if (v instanceof Variable) this.value = v.value
    else this.value = v
  }

  getMember(identifier: string | number) {
    const value = this.get()
    if (value == null || typeof value !== "object") return null
    return value[identifier] || null
  }

  declareMember(identifier: string | number) {
    const varObj = new Variable()
    this.value[identifier] = varObj
    return varObj
  }

  export() {
    const value = this.get()
    if (value == null || typeof value !== "object") return value
    const obj = Object.fromEntries(
      Object.entries(value as { [key: string | number]: Variable }).map((e) => [e[0], e[1].export()])
    )
    return isLuaArray(obj) ? Object.values(obj) : obj
  }
}

function parseLuaUnary(expression: LuaUnaryExpression, vars: VariableManager) {
  const { operator, argument } = expression

  switch (operator) {
    case "-":
      return -parseLuaObj(argument, vars)
    case "not":
      return !parseLuaObj(argument, vars)
    default:
      return null
  }
}

function parseLuaObj(obj: LuaObject, vars: VariableManager, identifierAsKey = false): any {
  switch (obj.type) {
    case "LocalStatement":
    case "AssignmentStatement": {
      const { variables, init } = <LuaLocalStatement | LuaAssignmentStatement>obj
      const isLocal = obj.type === "LocalStatement"
      for (let i = 0; i < variables.length; i++) vars.assign(variables[i], init[i], isLocal)
      break
    }
    case "Chunk": {
      parseLuaChunk(<LuaChunk>obj, vars)
      break
    }
    case "Identifier": {
      const identifier = (<LuaIdentifier>obj).name
      return identifierAsKey ? identifier : vars.get(identifier)
    }
    case "StringLiteral": {
      return (<LuaStringLiteral>obj).raw.slice(1, -1)
    }
    case "NumericLiteral": {
      return (<LuaNumericLiteral>obj).value
    }
    case "BooleanLiteral": {
      return (<LuaBooleanLiteral>obj).value
    }
    case "NilLiteral": {
      return null
    }
    case "TableKey": {
      const varObj = new Variable()
      varObj.set(parseLuaObj((<LuaTableKey>obj).value, vars))
      return {
        isTableField: true,
        key: parseLuaObj((<LuaTableKey>obj).key, vars),
        value: varObj,
      }
    }
    case "TableKeyString": {
      const varObj = new Variable()
      varObj.set(parseLuaObj((<LuaTableKeyString>obj).value, vars))
      return {
        isTableField: true,
        key: (<LuaTableKeyString>obj).key?.name,
        value: varObj,
      }
    }
    case "TableValue": {
      const varObj = new Variable()
      varObj.set(parseLuaObj((<LuaTableValue>obj).value, vars))
      return {
        isTableField: true,
        value: varObj,
      }
    }
    case "TableConstructorExpression": {
      const { fields } = <LuaTableConstructorExpression>obj
      const map = {}

      let i = 1
      fields.forEach((field) => {
        const fieldObj = parseLuaObj(field, vars)
        if (!fieldObj.isTableField) return
        const { key, value } = fieldObj
        map[key == null ? i : key] = value
        i++
      })

      return map
    }
    case "UnaryExpression": {
      return parseLuaUnary(<LuaUnaryExpression>obj, vars)
    }
    case "MemberExpression":
    case "IndexExpression": {
      const baseVarObj = vars.get(parseLuaObj((<LuaMemberExpression | LuaIndexExpression>obj).base, vars, true))
      if (baseVarObj == null && (<LuaMemberExpression | LuaIndexExpression>obj).base["name"] == "GadgetState")
        return GadgetStateEnum[obj["identifier"].name]
      if (baseVarObj == null && (<LuaMemberExpression | LuaIndexExpression>obj).base["name"] == "EventType")
        return EventTypeEnum[obj["identifier"].name]
      if (baseVarObj == null) return

      return baseVarObj.getMember(
        parseLuaObj(
          obj.type === "MemberExpression" ? (<LuaMemberExpression>obj).identifier : (<LuaIndexExpression>obj).index,
          vars,
          true
        )
      )
    }
  }

  return null
}

let counter = 0

async function parseLuaBlock(body: LuaObject[], vars: VariableManager) {
  if (counter++ % 500 === 0) await waitTick()

  const localVars = new VariableManager(vars.globalVars, vars)
  for (const obj of body) parseLuaObj(obj, localVars)
}

export async function parseLuaChunk(chunk: LuaChunk, vars: VariableManager) {
  await parseLuaBlock(chunk.body, vars)
}

export default async function parseLua(data: string, globalVars: VariableManager = new VariableManager()) {
  await parseLuaChunk(luaparse.parse(data), globalVars)
  return globalVars.export()
}
