import { Cmd } from 'tea-cup-fp'

import { type Update } from '@/common/type/tea'

import { type Model, type Msg } from './type'

export const init = (): Update<Model, Msg> => {
  return [{ _tag: 'LoginModel' }, Cmd.none()]
}

export const update = (msg: Msg, model: Model): Update<Model, Msg> => {
  switch (msg._tag) {
    case 'NoOp':
      return [model, Cmd.none()]
  }
}
