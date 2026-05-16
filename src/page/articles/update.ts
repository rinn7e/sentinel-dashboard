import { Cmd } from 'tea-cup-fp'
import * as O from 'fp-ts/lib/Option'

import { mockArticles } from '@/common/api/type/mock'
import { type Update } from '@/common/type/tea'

import { type Model, type Msg } from './type'

export const init = (): Update<Model, Msg> => {
  return [
    {
      _tag: 'ArticlesModel',
      articles: mockArticles,
      selectedArticle: O.none,
      searchText: '',
      sort: { attr: 'createdAt', direction: 'desc' },
    },
    Cmd.none(),
  ]
}

export const update = (msg: Msg, model: Model): Update<Model, Msg> => {
  switch (msg._tag) {
    case 'SelectArticle':
      return [{ ...model, selectedArticle: msg.article }, Cmd.none()]
    case 'ChangeSearchText':
      return [{ ...model, searchText: msg.text }, Cmd.none()]
    case 'ChangeSort':
      return [{ ...model, sort: msg.sort }, Cmd.none()]
    case 'NoOp':
      return [model, Cmd.none()]
  }
}
