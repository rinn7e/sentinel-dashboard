import * as EqClass from 'fp-ts/lib/Eq'
import * as S from 'fp-ts/lib/string'

export type HomePage = {
  readonly _tag: 'HomePage'
}

export type LoginPage = {
  readonly _tag: 'LoginPage'
}

export type ArticlesPage = {
  readonly _tag: 'ArticlesPage'
}

export type UsersPage = {
  readonly _tag: 'UsersPage'
}

export type CommentsPage = {
  readonly _tag: 'CommentsPage'
}

export type NotFoundPage = {
  readonly _tag: 'NotFoundPage'
}

export type AppPage =
  | HomePage
  | LoginPage
  | ArticlesPage
  | UsersPage
  | CommentsPage
  | NotFoundPage

export const HomePageEq: EqClass.Eq<HomePage> = EqClass.struct({
  _tag: S.Eq,
})

export const LoginPageEq: EqClass.Eq<LoginPage> = EqClass.struct({
  _tag: S.Eq,
})

export const ArticlesPageEq: EqClass.Eq<ArticlesPage> = EqClass.struct({
  _tag: S.Eq,
})

export const UsersPageEq: EqClass.Eq<UsersPage> = EqClass.struct({
  _tag: S.Eq,
})

export const CommentsPageEq: EqClass.Eq<CommentsPage> = EqClass.struct({
  _tag: S.Eq,
})

export const NotFoundPageEq: EqClass.Eq<NotFoundPage> = EqClass.struct({
  _tag: S.Eq,
})

export const AppPageEq: EqClass.Eq<AppPage> = {
  equals: (x, y) => {
    if (x._tag === 'HomePage' && y._tag === 'HomePage') {
      return HomePageEq.equals(x, y)
    } else if (x._tag === 'LoginPage' && y._tag === 'LoginPage') {
      return LoginPageEq.equals(x, y)
    } else if (x._tag === 'ArticlesPage' && y._tag === 'ArticlesPage') {
      return ArticlesPageEq.equals(x, y)
    } else if (x._tag === 'UsersPage' && y._tag === 'UsersPage') {
      return UsersPageEq.equals(x, y)
    } else if (x._tag === 'CommentsPage' && y._tag === 'CommentsPage') {
      return CommentsPageEq.equals(x, y)
    } else if (x._tag === 'NotFoundPage' && y._tag === 'NotFoundPage') {
      return NotFoundPageEq.equals(x, y)
    } else {
      return false
    }
  },
}

export type AppRoute = {
  page: AppPage
}

export const AppRouteEq: EqClass.Eq<AppRoute> = EqClass.struct({
  page: AppPageEq,
})

export const defaultAppRoute = (): AppRoute => ({
  page: { _tag: 'HomePage' },
})

export const homePage = (): AppPage => ({ _tag: 'HomePage' })
export const loginPage = (): AppPage => ({ _tag: 'LoginPage' })
export const articlesPage = (): AppPage => ({ _tag: 'ArticlesPage' })
export const usersPage = (): AppPage => ({ _tag: 'UsersPage' })
export const commentsPage = (): AppPage => ({ _tag: 'CommentsPage' })
export const notFoundPage = (): AppPage => ({ _tag: 'NotFoundPage' })
