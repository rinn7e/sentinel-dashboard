import { Cmd } from 'tea-cup-fp'
import { type Model, type Msg } from './type'
import { personas } from './persona'

export const init = (): [Model, Cmd<Msg>] => [
  {
    isCollapse: true,
    showDetails: false,
    currentPersona: personas.flashAg,
  },
  Cmd.none()
]

export const update = (msg: Msg, model: Model): [Model, Cmd<Msg>] => {
  switch (msg._tag) {
    case 'ToggleCollapse':
      return [
        {
          ...model,
          isCollapse: !model.isCollapse,
        },
        Cmd.none()
      ]
    case 'ToggleDetails':
      return [
        {
          ...model,
          showDetails: !model.showDetails,
        },
        Cmd.none()
      ]
    case 'SwitchPersona':
      return [
        {
          ...model,
          currentPersona: msg.persona,
          showDetails: false, // Reset details view when switching
        },
        Cmd.none()
      ]
    case 'NoOp':
      return [model, Cmd.none()]
  }
}
