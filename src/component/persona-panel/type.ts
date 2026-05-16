import * as EqClass from 'fp-ts/lib/Eq'
import * as B from 'fp-ts/lib/boolean'
import * as S from 'fp-ts/lib/string'

export type Persona = {
  id: string
  name: string
  bio: string
  portraitUrl: string
  dialogue: string
}

export type Model = {
  isCollapse: boolean
  showDetails: boolean
  currentPersona: Persona
}

export const PersonaEq = EqClass.struct<Persona>({
  id: S.Eq,
  name: S.Eq,
  bio: S.Eq,
  portraitUrl: S.Eq,
  dialogue: S.Eq,
})

export const ModelEq = EqClass.struct<Model>({
  isCollapse: B.Eq,
  showDetails: B.Eq,
  currentPersona: PersonaEq,
})

export type Msg = 
  | { _tag: 'ToggleCollapse' }
  | { _tag: 'ToggleDetails' }
  | { _tag: 'SwitchPersona'; persona: Persona }
  | { _tag: 'NoOp' }
