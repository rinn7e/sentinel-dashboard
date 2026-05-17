import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'

import { API_BASE } from '@/common/env'

import {
  type AdminUser,
  AdminUserJson,
  type AdminUserListResponse,
  AdminUserListResponseJson,
  type ApiError,
  type HttpError,
  type LoginRequest,
  type UserResponse,
  UserResponseJson,
} from '../type'
import {
  decodeApiError,
  decodeSuccess,
  ensureIsOk,
  fetchToTaskEither,
} from './common'

export const login = (
  request: LoginRequest,
): TE.TaskEither<HttpError<ApiError>, UserResponse> =>
  pipe(
    fetch(`${API_BASE}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    }),
    fetchToTaskEither,
    TE.chainEitherK(decodeSuccess(UserResponseJson)),
    TE.mapLeft(decodeApiError),
  )

export const getAdminUsers = (
  token: string,
  params: {
    page?: number
    username?: string
    email?: string
  } = {},
): TE.TaskEither<HttpError<ApiError>, AdminUserListResponse> => {
  const query = new URLSearchParams()
  if (params.page !== undefined) query.set('page', String(params.page))
  if (params.username !== undefined) query.set('username', params.username)
  if (params.email !== undefined) query.set('email', params.email)
  const qs = query.toString()

  return pipe(
    fetch(`${API_BASE}/admin/users${qs ? `?${qs}` : ''}`, {
      headers: { Authorization: `Token ${token}` },
    }),
    fetchToTaskEither,
    TE.chainEitherK(decodeSuccess(AdminUserListResponseJson)),
    TE.mapLeft(decodeApiError),
  )
}

export const deleteUser = (
  token: string,
  id: number,
): TE.TaskEither<HttpError<ApiError>, true> =>
  pipe(
    fetch(`${API_BASE}/admin/users/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Token ${token}` },
    }),
    fetchToTaskEither,
    TE.chainEitherK(ensureIsOk(true as const)),
    TE.mapLeft(decodeApiError),
  )

export const updateUserRole = (
  token: string,
  id: number,
  role: string,
): TE.TaskEither<HttpError<ApiError>, AdminUser> =>
  pipe(
    fetch(`${API_BASE}/admin/users/${id}/role`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ role }),
    }),
    fetchToTaskEither,
    TE.chainEitherK(decodeSuccess(AdminUserJson)),
    TE.mapLeft(decodeApiError),
  )
