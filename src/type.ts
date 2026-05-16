import { type Option } from 'fp-ts/lib/Option'

import { type AppRoute } from '@/common/type/route'
import * as Articles from '@/page/articles'
import * as Comments from '@/page/comments'
import * as Home from '@/page/home'
import * as Login from '@/page/login'
import * as Users from '@/page/users'
import * as Visitors from '@/page/visitors'
import * as Persona from '@/component/persona-panel/type'
import { type Theme } from './theme/type'

export type User = {
  username: string
  email: string
  token: string
}

export type Shared = {
  // TODO: Implement real authentication logic and session management
  user: Option<User>
}

export type Model = {
  route: AppRoute
  shared: Shared
  pageModel: PageModel
  persona: Persona.Model
  showScrollTop: boolean
  theme: Theme
}

export type PageModel =
  | { _tag: 'HomePageModel'; model: Home.Model }
  | { _tag: 'LoginPageModel'; model: Login.Model }
  | { _tag: 'ArticlesPageModel'; model: Articles.Model }
  | { _tag: 'UsersPageModel'; model: Users.Model }
  | { _tag: 'CommentsPageModel'; model: Comments.Model }
  | { _tag: 'VisitorsPageModel'; model: Visitors.Model }
  | { _tag: 'NotFoundPageModel' }

export type Msg =
  | { _tag: 'UrlChange'; location: Location }
  | { _tag: 'Navigate'; route: AppRoute }
  | { _tag: 'HomePageMsg'; subMsg: Home.Msg }
  | { _tag: 'LoginPageMsg'; subMsg: Login.Msg }
  | { _tag: 'ArticlesPageMsg'; subMsg: Articles.Msg }
  | { _tag: 'UsersPageMsg'; subMsg: Users.Msg }
  | { _tag: 'CommentsPageMsg'; subMsg: Comments.Msg }
  | { _tag: 'VisitorsPageMsg'; subMsg: Visitors.Msg }
  | { _tag: 'PersonaMsg'; subMsg: Persona.Msg }
  | { _tag: 'SetShowScrollTop'; value: boolean }
  | { _tag: 'ScrollToTop' }
  | { _tag: 'SwitchTheme'; theme: Theme }
  | { _tag: 'NoOp' }
