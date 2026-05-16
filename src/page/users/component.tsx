import React from 'react'
import * as O from 'fp-ts/lib/Option'

import { memoStrategy } from '@/common/util'

import { UserDetailOverlay } from './sub-component/user-detail-overlay'
import { PropsEq, type Props } from './type'

export const UsersComponent: React.FC<Props> = ({ model, dispatch }) => {
  return (
    <div className='relative flex flex-col gap-[24px]'>
      <h2 className='text-[28px] font-bold text-slate-800'>Users</h2>
      <div className='overflow-x-auto rounded-[12px] bg-white shadow-sm'>
        <table className='w-full text-left'>
          <thead className='bg-slate-50 text-[12px] font-semibold uppercase tracking-wider text-slate-500'>
            <tr>
              <th className='px-[24px] py-[16px]'>ID</th>
              <th className='px-[24px] py-[16px]'>Avatar</th>
              <th className='px-[24px] py-[16px]'>Username</th>
              <th className='px-[24px] py-[16px]'>Email</th>
              <th className='px-[24px] py-[16px]'>Bio</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-slate-100 text-[14px]'>
            {model.users.map((u) => (
              <tr 
                key={u.id} 
                className='cursor-pointer hover:bg-slate-50 transition-colors'
                onClick={() => dispatch({ _tag: 'SelectUser', user: O.some(u) })}
              >
                <td className='px-[24px] py-[16px] font-mono text-slate-400'>{u.id}</td>
                <td className='px-[24px] py-[16px]'>
                  <img
                    src={u.image || ''}
                    className='h-[32px] w-[32px] rounded-full object-cover shadow-sm'
                    alt=''
                  />
                </td>
                <td className='px-[24px] py-[16px] font-medium text-slate-800'>{u.username}</td>
                <td className='px-[24px] py-[16px] text-slate-600'>{u.email}</td>
                <td className='px-[24px] py-[16px] text-slate-400 max-w-[300px] truncate'>{u.bio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <UserDetailOverlay 
        selectedUser={model.selectedUser} 
        dispatch={dispatch} 
      />
    </div>
  )
}

export const UsersMemo = memoStrategy(UsersComponent, PropsEq.equals)
