import { EqAlways } from '@rinn7e/tea-cup-prelude'
import * as EqClass from 'fp-ts/lib/Eq'
import * as S from 'fp-ts/lib/string'
import { type Dispatcher } from 'tea-cup-fp'

export type Model = {
  readonly _tag: 'LoginModel'
}

export type Msg = { readonly _tag: 'NoOp' }

export const ModelEq: EqClass.Eq<Model> = EqClass.struct({
  _tag: S.Eq,
})

export type Props = {
  model: Model
  dispatch: Dispatcher<Msg>
}

export const PropsEq: EqClass.Eq<Props> = EqClass.struct({
  model: ModelEq,
  dispatch: EqAlways,
})
