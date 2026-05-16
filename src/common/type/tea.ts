import { type Cmd } from 'tea-cup-fp'

export type Update<Model, Msg> = [Model, Cmd<Msg>]
