import { EqAlways } from '@rinn7e/tea-cup-prelude'
import * as A from 'fp-ts/lib/Array'
import * as EqClass from 'fp-ts/lib/Eq'
import * as O from 'fp-ts/lib/Option'
import * as S from 'fp-ts/lib/string'
import { type Dispatcher } from 'tea-cup-fp'

import { type Article, ArticleEq } from '@/common/api/type/article'
import { type Sort, SortEq } from '@/common/type/filter'

export type Model = {
  readonly _tag: 'ArticlesModel'
  readonly articles: Article[]
  readonly selectedArticle: O.Option<Article>
  readonly searchText: string
  readonly sort: Sort
}

export type Msg = 
  | { readonly _tag: 'NoOp' }
  | { readonly _tag: 'SelectArticle'; readonly article: O.Option<Article> }
  | { readonly _tag: 'ChangeSearchText'; readonly text: string }
  | { readonly _tag: 'ChangeSort'; readonly sort: Sort }

export const ModelEq: EqClass.Eq<Model> = EqClass.struct({
  _tag: S.Eq,
  articles: A.getEq(ArticleEq),
  selectedArticle: O.getEq(ArticleEq),
  searchText: S.Eq,
  sort: SortEq,
})

export type Props = {
  model: Model
  dispatch: Dispatcher<Msg>
}

export const PropsEq: EqClass.Eq<Props> = EqClass.struct({
  model: ModelEq,
  dispatch: EqAlways,
})
