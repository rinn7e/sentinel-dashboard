import { EqAlways } from '@rinn7e/tea-cup-prelude'
import * as EqClass from 'fp-ts/lib/Eq'
import * as N from 'fp-ts/lib/number'
import * as S from 'fp-ts/lib/string'
import { type Dispatcher } from 'tea-cup-fp'

export type Model = {
  readonly _tag: 'HomeModel'
  readonly articleCount: number
  readonly userCount: number
  readonly commentCount: number
}

export type Msg = { readonly _tag: 'NoOp' }

export const ModelEq: EqClass.Eq<Model> = EqClass.struct({
  _tag: S.Eq,
  articleCount: N.Eq,
  userCount: N.Eq,
  commentCount: N.Eq,
})

export type Props = {
  model: Model
  dispatch: Dispatcher<Msg>
}

export const PropsEq: EqClass.Eq<Props> = EqClass.struct({
  model: ModelEq,
  dispatch: EqAlways,
})
