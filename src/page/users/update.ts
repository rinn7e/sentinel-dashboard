import { Cmd } from 'tea-cup-fp'
import * as O from 'fp-ts/lib/Option'

import { mockUsers } from '@/common/api/type/mock'
import { type Update } from '@/common/type/tea'

import { type Model, type Msg } from './type'

export const init = (): Update<Model, Msg> => {
  return [
    {
      _tag: 'UsersModel',
      users: mockUsers,
      selectedUser: O.none,
    },
    Cmd.none(),
  ]
}

export const update = (msg: Msg, model: Model): Update<Model, Msg> => {
  switch (msg._tag) {
    case 'SelectUser':
      return [{ ...model, selectedUser: msg.user }, Cmd.none()]
    case 'NoOp':
      return [model, Cmd.none()]
  }
}
