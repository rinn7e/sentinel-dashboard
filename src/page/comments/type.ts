import { EqAlways } from '@rinn7e/tea-cup-prelude'
import * as A from 'fp-ts/lib/Array'
import * as EqClass from 'fp-ts/lib/Eq'
import * as S from 'fp-ts/lib/string'
import { type Dispatcher } from 'tea-cup-fp'

import { type Comment, CommentEq } from '@/common/api/type/comment'

export type Model = {
  readonly _tag: 'CommentsModel'
  readonly comments: Comment[]
}

export type Msg = { readonly _tag: 'NoOp' }

export const ModelEq: EqClass.Eq<Model> = EqClass.struct({
  _tag: S.Eq,
  comments: A.getEq(CommentEq),
})

export type Props = {
  model: Model
  dispatch: Dispatcher<Msg>
}

export const PropsEq: EqClass.Eq<Props> = EqClass.struct({
  model: ModelEq,
  dispatch: EqAlways,
})
