import React from 'react'

import { memoStrategy } from '@/common/util'

import { PropsEq, type Props } from './type'

export const UsersComponent: React.FC<Props> = ({ model }) => {
  return (
    <div className='flex flex-col gap-[24px]'>
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
            {model.users.map((user) => (
              <tr key={user.id} className='hover:bg-slate-50'>
                <td className='px-[24px] py-[16px] font-mono text-slate-400'>{user.id}</td>
                <td className='px-[24px] py-[16px]'>
                  <img
                    src={user.image || 'https://api.dicebear.com/7.x/initials/svg?seed=' + user.username}
                    alt={user.username}
                    className='h-[32px] w-[32px] rounded-full bg-slate-100'
                  />
                </td>
                <td className='px-[24px] py-[16px] font-medium text-slate-800'>{user.username}</td>
                <td className='px-[24px] py-[16px] text-blue-600'>{user.email}</td>
                <td className='max-w-[300px] truncate px-[24px] py-[16px] text-slate-500'>{user.bio || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export const UsersMemo = memoStrategy(UsersComponent, PropsEq.equals)
