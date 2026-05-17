import { Cmd } from 'tea-cup-fp'


import { type Model, type Msg } from './type'

export const init = (): [Model, Cmd<Msg>] => {
  return [{ _tag: 'LoginModel' }, Cmd.none()]
}

export const update = (msg: Msg, model: Model): [Model, Cmd<Msg>] => {
  switch (msg._tag) {
    case 'NoOp':
      return [model, Cmd.none()]
  }
}
