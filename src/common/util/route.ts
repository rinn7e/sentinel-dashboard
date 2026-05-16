import { end, format, lit, parse, Route, zero } from '@rinn7e/fp-ts-routing'

import {
  type AppPage,
  type AppRoute,
  articlesPage,
  commentsPage,
  homePage,
  loginPage,
  notFoundPage,
  settingsPage,
  usersPage,
  visitorsPage,
} from '../type/route'

const homeMatch = end
const loginMatch = lit('login').and(end)
const articlesMatch = lit('articles').and(end)
const usersMatch = lit('users').and(end)
const commentsMatch = lit('comments').and(end)
const settingsMatch = lit('settings').and(end)
const visitorsMatch = lit('visitors').and(end)

const appRouter = zero<AppPage>()
  .alt(homeMatch.parser.map(homePage))
  .alt(loginMatch.parser.map(loginPage))
  .alt(articlesMatch.parser.map(articlesPage))
  .alt(usersMatch.parser.map(usersPage))
  .alt(commentsMatch.parser.map(commentsPage))
  .alt(visitorsMatch.parser.map(visitorsPage))
  .alt(settingsMatch.parser.map(settingsPage))

export const parseAppRoute = (origin: string, url: string): AppRoute => {
  const path = url.replace(origin, '')
  const page = parse(appRouter, Route.parse(path), notFoundPage())
  return { page }
}

export const toUrlString = (appRoute: AppRoute): string => {
  const { page } = appRoute
  switch (page._tag) {
    case 'HomePage':
      return format(homeMatch.formatter, {})
    case 'LoginPage':
      return format(loginMatch.formatter, {})
    case 'ArticlesPage':
      return format(articlesMatch.formatter, {})
    case 'UsersPage':
      return format(usersMatch.formatter, {})
    case 'CommentsPage':
      return format(commentsMatch.formatter, {})
    case 'VisitorsPage':
      return format(visitorsMatch.formatter, {})
    case 'SettingsPage':
      return format(settingsMatch.formatter, {})
    case 'NotFoundPage':
      return '/404'
    default:
      return '/404'
  }
}
