import { NullableEq } from '@rinn7e/tea-cup-prelude'
import * as EqClass from 'fp-ts/lib/Eq'
import * as N from 'fp-ts/lib/number'
import * as S from 'fp-ts/lib/string'
import * as t from 'io-ts'

export type Visitor = {
  id: number
  browserFingerprint: string
  userId: number | null
  ipAddress: string
  userAgent: string | null
  visitCount: number
  lastVisitAt: string
}

export const VisitorEq: EqClass.Eq<Visitor> = EqClass.struct({
  id: N.Eq,
  browserFingerprint: S.Eq,
  userId: NullableEq(N.Eq),
  ipAddress: S.Eq,
  userAgent: NullableEq(S.Eq),
  visitCount: N.Eq,
  lastVisitAt: S.Eq,
})

export const VisitorJson: t.Type<Visitor> = t.type({
  id: t.number,
  browserFingerprint: t.string,
  userId: t.union([t.number, t.null]),
  ipAddress: t.string,
  userAgent: t.union([t.string, t.null]),
  visitCount: t.number,
  lastVisitAt: t.string,
})
