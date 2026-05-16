import { NullableEq } from '@rinn7e/tea-cup-prelude'
import * as EqClass from 'fp-ts/lib/Eq'
import * as N from 'fp-ts/lib/number'
import * as S from 'fp-ts/lib/string'
import * as t from 'io-ts'

export type User = {
  id: number
  username: string
  email: string
  bio: string | null
  image: string | null
}

export const UserEq: EqClass.Eq<User> = EqClass.struct({
  id: N.Eq,
  username: S.Eq,
  email: S.Eq,
  bio: NullableEq(S.Eq),
  image: NullableEq(S.Eq),
})

export const UserJson: t.Type<User> = t.type({
  id: t.number,
  username: t.string,
  email: t.string,
  bio: t.union([t.string, t.null]),
  image: t.union([t.string, t.null]),
})
