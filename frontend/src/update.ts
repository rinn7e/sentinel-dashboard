import { taskFromTE } from '@rinn7e/tea-cup-prelude'
import * as O from 'fp-ts/lib/Option'
import { newUrl } from 'react-tea-cup'
import { Cmd, Task } from 'tea-cup-fp'

import { getCurrentUser } from '@/common/api/handler/user'
import { getToken, removeToken, saveToken } from '@/common/cache'
import { type AppRoute } from '@/common/type/route'
import { parseAppRoute, toUrlString } from '@/common/util/route'
import * as Persona from '@/component/persona-panel/update'
import * as Articles from '@/page/articles'
import * as Comments from '@/page/comments'
import * as Home from '@/page/home'
import * as Login from '@/page/login'
import * as Users from '@/page/users'
import * as Visitors from '@/page/visitors'

import { defaultTheme, themes } from './theme/data'
import {
  injectTheme,
  loadColorScheme,
  loadThemeId,
  saveColorScheme,
  saveTheme,
} from './theme/util'
import { type Model, type Msg, type PageModel } from './type'

export const initPageModel = (route: AppRoute): [PageModel, Cmd<Msg>] => {
  switch (route.page._tag) {
    case 'HomePage': {
      const [m, c] = Home.init()
      return [
        { _tag: 'HomePageModel', model: m },
        c.map((subMsg): Msg => ({ _tag: 'HomePageMsg', subMsg })),
      ]
    }
    case 'LoginPage': {
      const [m, c] = Login.init()
      return [
        { _tag: 'LoginPageModel', model: m },
        c.map((subMsg): Msg => ({ _tag: 'LoginPageMsg', subMsg })),
      ]
    }
    case 'ArticlesPage': {
      const [m, c] = Articles.init()
      return [
        { _tag: 'ArticlesPageModel', model: m },
        c.map((subMsg): Msg => ({ _tag: 'ArticlesPageMsg', subMsg })),
      ]
    }
    case 'UsersPage': {
      const [m, c] = Users.init()
      return [
        { _tag: 'UsersPageModel', model: m },
        c.map((subMsg): Msg => ({ _tag: 'UsersPageMsg', subMsg })),
      ]
    }
    case 'CommentsPage': {
      const [m, c] = Comments.init()
      return [
        { _tag: 'CommentsPageModel', model: m },
        c.map((subMsg): Msg => ({ _tag: 'CommentsPageMsg', subMsg })),
      ]
    }
    case 'VisitorsPage': {
      const [m, c] = Visitors.init()
      return [
        { _tag: 'VisitorsPageModel', model: m },
        c.map((subMsg): Msg => ({ _tag: 'VisitorsPageMsg', subMsg })),
      ]
    }
    case 'SettingsPage':
      return [{ _tag: 'SettingsPageModel' }, Cmd.none()]
    case 'NotFoundPage':
    default:
      return [{ _tag: 'NotFoundPageModel' }, Cmd.none()]
  }
}

export const preInit = (location: Location): [Model, Cmd<Msg>] => {
  const storedToken = getToken()
  const hasToken = !!storedToken

  let route = parseAppRoute(window.location.origin, location.href)
  if (!hasToken && route.page._tag !== 'LoginPage') {
    route = { page: { _tag: 'LoginPage' } }
  }

  const [pageModel, pageCmd] = initPageModel(route)
  const [personaModel, personaCmd] = Persona.init()
  const colorScheme = loadColorScheme()
  const savedThemeId = loadThemeId()
  const theme = (savedThemeId ? themes[savedThemeId] : null) ?? defaultTheme
  const model: Model = {
    route,
    shared: {
      user: O.none,
      token: storedToken ? O.some(storedToken) : O.none,
    },
    pageModel,
    persona: personaModel,
    showScrollTop: false,
    theme,
    colorScheme,
  }

  const validationCmd = storedToken
    ? Task.attempt(taskFromTE(getCurrentUser(storedToken)), (res): Msg => {
        if (res.tag === 'Ok') {
          return {
            _tag: 'InitSession',
            user: O.some({
              email: res.value.user.email,
              token: res.value.user.token,
              username: res.value.user.username,
              bio: res.value.user.bio,
              image: res.value.user.image,
            }),
            token: O.some(res.value.user.token),
          }
        } else {
          removeToken()
          return {
            _tag: 'InitSession',
            user: O.none,
            token: O.none,
          }
        }
      })
    : Cmd.none<Msg>()

  return [
    model,
    Cmd.batch([
      pageCmd,
      validationCmd,
      personaCmd.map((subMsg): Msg => ({ _tag: 'PersonaMsg', subMsg })),
      // Initial theme injection using persisted color scheme
      Task.perform(
        Task.succeed(undefined).andThen(() => {
          injectTheme(theme, colorScheme)
          return Task.succeed(undefined)
        }),
        () => ({ _tag: 'NoOp' }) as Msg,
      ),
    ]),
  ]
}

export const preUpdate = (msg: Msg, model: Model): [Model, Cmd<Msg>] => {
  switch (msg._tag) {
    case 'UrlChange': {
      const route = parseAppRoute(window.location.origin, msg.location.href)
      const isLoggedIn = O.isSome(model.shared.user)

      if (route.page._tag !== 'LoginPage' && !isLoggedIn && O.isNone(model.shared.token)) {
        const [pageModel, pageCmd] = initPageModel({ page: { _tag: 'LoginPage' } })
        return [
          { ...model, route: { page: { _tag: 'LoginPage' } }, pageModel, showScrollTop: false },
          pageCmd,
        ]
      }

      if (route.page._tag === 'LoginPage' && isLoggedIn) {
        const [pageModel, pageCmd] = initPageModel({ page: { _tag: 'HomePage' } })
        return [
          { ...model, route: { page: { _tag: 'HomePage' } }, pageModel, showScrollTop: false },
          pageCmd,
        ]
      }

      const [pageModel, pageCmd] = initPageModel(route)
      return [{ ...model, route, pageModel, showScrollTop: false }, pageCmd]
    }
    case 'Navigate': {
      const url = toUrlString(msg.route)
      return [model, Task.perform(newUrl(url), (): Msg => ({ _tag: 'NoOp' }))]
    }
    case 'InitSession': {
      const nextModel = {
        ...model,
        shared: {
          user: msg.user,
          token: msg.token,
        },
      }

      const isLoggedIn = O.isSome(msg.user)
      if (isLoggedIn && model.route.page._tag === 'LoginPage') {
        return [
          nextModel,
          Task.perform(newUrl(toUrlString({ page: { _tag: 'HomePage' } })), (): Msg => ({ _tag: 'NoOp' })),
        ]
      }

      if (!isLoggedIn && model.route.page._tag !== 'LoginPage') {
        return [
          nextModel,
          Task.perform(newUrl(toUrlString({ page: { _tag: 'LoginPage' } })), (): Msg => ({ _tag: 'NoOp' })),
        ]
      }

      return [nextModel, Cmd.none()]
    }
    case 'Logout': {
      removeToken()
      const nextModel = {
        ...model,
        shared: {
          user: O.none,
          token: O.none,
        },
      }
      return [
        nextModel,
        Task.perform(newUrl(toUrlString({ page: { _tag: 'LoginPage' } })), (): Msg => ({ _tag: 'NoOp' })),
      ]
    }
    case 'HomePageMsg': {
      if (model.pageModel._tag === 'HomePageModel') {
        const [m, c] = Home.update(msg.subMsg, model.pageModel.model)
        return [
          { ...model, pageModel: { ...model.pageModel, model: m } },
          c.map((subMsg): Msg => ({ _tag: 'HomePageMsg', subMsg })),
        ]
      }
      return [model, Cmd.none()]
    }
    case 'LoginPageMsg': {
      if (model.pageModel._tag === 'LoginPageModel') {
        const [m, c] = Login.update(msg.subMsg, model.pageModel.model)
        const nextModel = { ...model, pageModel: { ...model.pageModel, model: m } }
        const nextCmd = c.map((subMsg): Msg => ({ _tag: 'LoginPageMsg', subMsg }))

        if (msg.subMsg._tag === 'SubmitResult' && msg.subMsg.result.tag === 'Ok') {
          const user = msg.subMsg.result.value.user
          saveToken(user.token)
          const updatedModel = {
            ...nextModel,
            shared: {
              ...nextModel.shared,
              user: O.some({
                email: user.email,
                token: user.token,
                username: user.username,
                bio: user.bio,
                image: user.image,
              }),
              token: O.some(user.token),
            },
          }
          return [
            updatedModel,
            Cmd.batch([
              nextCmd,
              Task.perform(
                newUrl(toUrlString({ page: { _tag: 'HomePage' } })),
                (): Msg => ({ _tag: 'NoOp' }),
              ),
            ]),
          ]
        }

        return [nextModel, nextCmd]
      }
      return [model, Cmd.none()]
    }
    case 'ArticlesPageMsg': {
      if (model.pageModel._tag === 'ArticlesPageModel') {
        const [m, c] = Articles.update(msg.subMsg, model.pageModel.model)
        return [
          { ...model, pageModel: { ...model.pageModel, model: m } },
          c.map((subMsg): Msg => ({ _tag: 'ArticlesPageMsg', subMsg })),
        ]
      }
      return [model, Cmd.none()]
    }
    case 'UsersPageMsg': {
      if (model.pageModel._tag === 'UsersPageModel') {
        const [m, c] = Users.update(msg.subMsg, model.pageModel.model)
        return [
          { ...model, pageModel: { ...model.pageModel, model: m } },
          c.map((subMsg): Msg => ({ _tag: 'UsersPageMsg', subMsg })),
        ]
      }
      return [model, Cmd.none()]
    }
    case 'CommentsPageMsg': {
      if (model.pageModel._tag === 'CommentsPageModel') {
        const [m, c] = Comments.update(msg.subMsg, model.pageModel.model)
        return [
          { ...model, pageModel: { ...model.pageModel, model: m } },
          c.map((subMsg): Msg => ({ _tag: 'CommentsPageMsg', subMsg })),
        ]
      }
      return [model, Cmd.none()]
    }
    case 'VisitorsPageMsg': {
      if (model.pageModel._tag === 'VisitorsPageModel') {
        const [m, c] = Visitors.update(msg.subMsg, model.pageModel.model)
        return [
          { ...model, pageModel: { ...model.pageModel, model: m } },
          c.map((subMsg): Msg => ({ _tag: 'VisitorsPageMsg', subMsg })),
        ]
      }
      return [model, Cmd.none()]
    }
    case 'PersonaMsg': {
      const [m, c] = Persona.update(msg.subMsg, model.persona)
      return [
        { ...model, persona: m },
        c.map((subMsg): Msg => ({ _tag: 'PersonaMsg', subMsg })),
      ]
    }
    case 'SetShowScrollTop':
      return [{ ...model, showScrollTop: msg.value }, Cmd.none()]
    case 'ScrollToTop': {
      return [
        model,
        Task.perform(
          Task.succeed(undefined).andThen(() => {
            document
              .getElementById('main-content')
              ?.scrollTo({ top: 0, behavior: 'smooth' })
            return Task.succeed(undefined)
          }),
          () => ({ _tag: 'NoOp' }) as Msg,
        ),
      ]
    }
    case 'SwitchTheme': {
      return [
        { ...model, theme: msg.theme },
        Task.perform(
          Task.succeed(undefined).andThen(() => {
            saveTheme(msg.theme)
            injectTheme(msg.theme, model.colorScheme)
            return Task.succeed(undefined)
          }),
          () => ({ _tag: 'NoOp' }) as Msg,
        ),
      ]
    }
    case 'SetColorScheme': {
      return [
        { ...model, colorScheme: msg.scheme },
        Task.perform(
          Task.succeed(undefined).andThen(() => {
            saveColorScheme(msg.scheme)
            injectTheme(model.theme, msg.scheme)
            return Task.succeed(undefined)
          }),
          () => ({ _tag: 'NoOp' }) as Msg,
        ),
      ]
    }
    case 'NoOp':
      return [model, Cmd.none()]
  }
}
