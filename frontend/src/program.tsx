import { devTools } from '@rinn7e/tea-cup-prelude'
import { ProgramWithNav } from 'react-tea-cup'
import { type Dispatcher, Sub } from 'tea-cup-fp'

import { App } from './app'
import { type Model, type Msg } from './type'
import { preInit, preUpdate } from './update'

const preLoadingView = () => {
  return (
    <div className='initial-loader-wrap'>
      <div className='initial-loader'></div>
    </div>
  )
}

const preView = (dispatch: Dispatcher<Msg>, model: Model | null) => {
  return model ? <App model={model} dispatch={dispatch} /> : preLoadingView()
}

// Wrapper for update to handle null model
const updateWrapper = (msg: Msg, model: Model | null): [Model | null, any] => {
  if (model === null) {
    return [null, null]
  }
  return preUpdate(msg, model)
}

export const AppProgram = () => {
  return (
    <ProgramWithNav<Model | null, Msg>
      onUrlChange={(location) => ({ _tag: 'UrlChange', location })}
      init={preInit}
      update={updateWrapper}
      view={preView}
      subscriptions={() => Sub.none()}
      {...devTools<Model | null, Msg>().getProgramProps()}
    />
  )
}
