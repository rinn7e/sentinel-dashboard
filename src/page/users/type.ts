import { EqAlways } from '@rinn7e/tea-cup-prelude'
import * as A from 'fp-ts/lib/Array'
import * as EqClass from 'fp-ts/lib/Eq'
import * as S from 'fp-ts/lib/string'
import { type Dispatcher } from 'tea-cup-fp'

import { type User, UserEq } from '@/common/api/type/user'

export type Model = {
  readonly _tag: 'UsersModel'
  readonly users: User[]
}

export type Msg = { readonly _tag: 'NoOp' }

export const ModelEq: EqClass.Eq<Model> = EqClass.struct({
  _tag: S.Eq,
  users: A.getEq(UserEq),
})

export type Props = {
  model: Model
  dispatch: Dispatcher<Msg>
}

export const PropsEq: EqClass.Eq<Props> = EqClass.struct({
  model: ModelEq,
  dispatch: EqAlways,
})
