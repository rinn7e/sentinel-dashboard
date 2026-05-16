import {
  Formatter,
  Match,
  Parser,
  Route,
  end,
  format,
  lit,
  parse,
  zero,
} from '@rinn7e/fp-ts-routing'
import * as O from 'fp-ts/lib/Option'

import {
  type AppPage,
  type AppRoute,
  articlesPage,
  commentsPage,
  homePage,
  loginPage,
  notFoundPage,
  usersPage,
} from '@/common/type/route'

// Parser
// ------------------------------------------------------------------

const homeMatch = end
const homeAliasMatch = lit('home').and(end)
const loginMatch = lit('login').and(end)
const articlesMatch = lit('articles').and(end)
const usersMatch = lit('users').and(end)
const commentsMatch = lit('comments').and(end)

const anyStrings = new Match<object>(
  new Parser((r) => O.some([{}, new Route([], r.query)])),
  new Formatter((r) => r),
)

const appRouter: Parser<AppPage> = zero<AppPage>()
  .alt(homeMatch.parser.map(() => homePage()))
  .alt(homeAliasMatch.parser.map(() => homePage()))
  .alt(loginMatch.parser.map(() => loginPage()))
  .alt(articlesMatch.parser.map(() => articlesPage()))
  .alt(usersMatch.parser.map(() => usersPage()))
  .alt(commentsMatch.parser.map(() => commentsPage()))
  .alt(anyStrings.parser.map(() => notFoundPage()))

export const parseAppRoute = (_mainUrl: string, href: string): AppRoute => {
  const url = new URL(href)
  const pathname = url.pathname
  // Simple pathname parsing for now, assuming base is /
  const page = parse(appRouter, Route.parse(pathname), homePage())
  return { page }
}

// Formatter
// ------------------------------------------------------------------

export const toUrlString = (r: AppRoute): string => {
  const page = r.page
  const getPath = () => {
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
      case 'NotFoundPage':
        return '/404'
    }
  }

  return getPath()
}
