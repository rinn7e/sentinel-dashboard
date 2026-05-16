import { EqAlways } from '@rinn7e/tea-cup-prelude'
import * as A from 'fp-ts/lib/Array'
import * as EqClass from 'fp-ts/lib/Eq'
import * as O from 'fp-ts/lib/Option'
import * as S from 'fp-ts/lib/string'
import { type Dispatcher } from 'tea-cup-fp'

import { type Visitor, VisitorEq } from '@/common/api/type/visitor'

export type Model = {
  readonly _tag: 'VisitorsModel'
  readonly visitors: Visitor[]
  readonly selectedVisitor: O.Option<Visitor>
}

export type Msg = 
  | { readonly _tag: 'NoOp' }
  | { readonly _tag: 'SelectVisitor'; readonly visitor: O.Option<Visitor> }

export const ModelEq: EqClass.Eq<Model> = EqClass.struct({
  _tag: S.Eq,
  visitors: A.getEq(VisitorEq),
  selectedVisitor: O.getEq(VisitorEq),
})

export type Props = {
  model: Model
  dispatch: Dispatcher<Msg>
}

export const PropsEq: EqClass.Eq<Props> = EqClass.struct({
  model: ModelEq,
  dispatch: EqAlways,
})
