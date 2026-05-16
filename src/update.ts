import * as O from 'fp-ts/lib/Option'
import { newUrl } from 'react-tea-cup'
import { Cmd, Task } from 'tea-cup-fp'

import { type AppRoute } from '@/common/type/route'
import { type Update } from '@/common/type/tea'
import { parseAppRoute, toUrlString } from '@/common/util/route'
import * as Articles from '@/page/articles'
import * as Comments from '@/page/comments'
import * as Home from '@/page/home'
import * as Login from '@/page/login'
import * as Users from '@/page/users'
import * as Visitors from '@/page/visitors'

import { type Model, type Msg, type PageModel } from './type'

export const initPageModel = (route: AppRoute): Update<PageModel, Msg> => {
  switch (route.page._tag) {
    case 'HomePage': {
      const [m, c] = Home.init()
      return [{ _tag: 'HomePageModel', model: m }, c.map((subMsg): Msg => ({ _tag: 'HomePageMsg', subMsg }))]
    }
    case 'LoginPage': {
      const [m, c] = Login.init()
      return [{ _tag: 'LoginPageModel', model: m }, c.map((subMsg): Msg => ({ _tag: 'LoginPageMsg', subMsg }))]
    }
    case 'ArticlesPage': {
      const [m, c] = Articles.init()
      return [{ _tag: 'ArticlesPageModel', model: m }, c.map((subMsg): Msg => ({ _tag: 'ArticlesPageMsg', subMsg }))]
    }
    case 'UsersPage': {
      const [m, c] = Users.init()
      return [{ _tag: 'UsersPageModel', model: m }, c.map((subMsg): Msg => ({ _tag: 'UsersPageMsg', subMsg }))]
    }
    case 'CommentsPage': {
      const [m, c] = Comments.init()
      return [{ _tag: 'CommentsPageModel', model: m }, c.map((subMsg): Msg => ({ _tag: 'CommentsPageMsg', subMsg }))]
    }
    case 'VisitorsPage': {
      const [m, c] = Visitors.init()
      return [{ _tag: 'VisitorsPageModel', model: m }, c.map((subMsg): Msg => ({ _tag: 'VisitorsPageMsg', subMsg }))]
    }
    case 'NotFoundPage':
    default:
      return [{ _tag: 'NotFoundPageModel' }, Cmd.none()]
  }
}

export const preInit = (location: Location): Update<Model, Msg> => {
  const route = parseAppRoute(window.location.origin, location.href)
  const [pageModel, pageCmd] = initPageModel(route)
  const model: Model = {
    route,
    shared: {
      user: O.none,
    },
    pageModel,
  }
  return [model, pageCmd]
}

export const preUpdate = (msg: Msg, model: Model): Update<Model, Msg> => {
  switch (msg._tag) {
    case 'UrlChange': {
      const route = parseAppRoute(window.location.origin, msg.location.href)
      const [pageModel, pageCmd] = initPageModel(route)
      return [{ ...model, route, pageModel }, pageCmd]
    }
    case 'Navigate': {
      const url = toUrlString(msg.route)
      return [model, Task.perform(newUrl(url), (): Msg => ({ _tag: 'NoOp' }))]
    }
    case 'HomePageMsg': {
      if (model.pageModel._tag === 'HomePageModel') {
        const [m, c] = Home.update(msg.subMsg, model.pageModel.model)
        return [{ ...model, pageModel: { ...model.pageModel, model: m } }, c.map((subMsg): Msg => ({ _tag: 'HomePageMsg', subMsg }))]
      }
      return [model, Cmd.none()]
    }
    case 'LoginPageMsg': {
      if (model.pageModel._tag === 'LoginPageModel') {
        const [m, c] = Login.update(msg.subMsg, model.pageModel.model)
        return [{ ...model, pageModel: { ...model.pageModel, model: m } }, c.map((subMsg): Msg => ({ _tag: 'LoginPageMsg', subMsg }))]
      }
      return [model, Cmd.none()]
    }
    case 'ArticlesPageMsg': {
      if (model.pageModel._tag === 'ArticlesPageModel') {
        const [m, c] = Articles.update(msg.subMsg, model.pageModel.model)
        return [{ ...model, pageModel: { ...model.pageModel, model: m } }, c.map((subMsg): Msg => ({ _tag: 'ArticlesPageMsg', subMsg }))]
      }
      return [model, Cmd.none()]
    }
    case 'UsersPageMsg': {
      if (model.pageModel._tag === 'UsersPageModel') {
        const [m, c] = Users.update(msg.subMsg, model.pageModel.model)
        return [{ ...model, pageModel: { ...model.pageModel, model: m } }, c.map((subMsg): Msg => ({ _tag: 'UsersPageMsg', subMsg }))]
      }
      return [model, Cmd.none()]
    }
    case 'CommentsPageMsg': {
      if (model.pageModel._tag === 'CommentsPageModel') {
        const [m, c] = Comments.update(msg.subMsg, model.pageModel.model)
        return [{ ...model, pageModel: { ...model.pageModel, model: m } }, c.map((subMsg): Msg => ({ _tag: 'CommentsPageMsg', subMsg }))]
      }
      return [model, Cmd.none()]
    }
    case 'VisitorsPageMsg': {
      if (model.pageModel._tag === 'VisitorsPageModel') {
        const [m, c] = Visitors.update(msg.subMsg, model.pageModel.model)
        return [{ ...model, pageModel: { ...model.pageModel, model: m } }, c.map((subMsg): Msg => ({ _tag: 'VisitorsPageMsg', subMsg }))]
      }
      return [model, Cmd.none()]
    }
    case 'NoOp':
      return [model, Cmd.none()]
  }
}
