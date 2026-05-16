import React from 'react'
import * as O from 'fp-ts/lib/Option'

import { memoStrategy } from '@/common/util'

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

      {/* Detail Overlay */}
      {O.isSome(model.selectedUser) && (
        <>
          <div 
            className='fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-[2px]' 
            onClick={() => dispatch({ _tag: 'SelectUser', user: O.none })}
          />
          <div className='fixed right-0 top-0 z-50 h-full w-full max-w-[50%] animate-in slide-in-from-right bg-white shadow-2xl duration-300'>
            <div className='flex h-full flex-col'>
              <div className='flex items-center justify-between border-b border-slate-100 p-[24px]'>
                <h3 className='text-[20px] font-bold text-slate-800'>User Profile</h3>
                <button 
                  onClick={() => dispatch({ _tag: 'SelectUser', user: O.none })}
                  className='rounded-full p-[8px] text-slate-400 hover:bg-slate-50 hover:text-slate-600'
                >
                  ✕
                </button>
              </div>
              <div className='flex-grow overflow-y-auto p-[32px]'>
                <div className='mb-[32px] flex items-center gap-[24px]'>
                  <img 
                    src={model.selectedUser.value.image || ''} 
                    className='h-[100px] w-[100px] rounded-[24px] object-cover shadow-lg border-4 border-white'
                    alt=''
                  />
                  <div>
                    <div className='text-[24px] font-bold text-slate-800'>{model.selectedUser.value.username}</div>
                    <div className='text-slate-500'>{model.selectedUser.value.email}</div>
                  </div>
                </div>
                
                <div className='grid grid-cols-2 gap-[24px]'>
                  <DetailRow label='User ID' value={model.selectedUser.value.id.toString()} mono />
                  <DetailRow label='Account Status' value='Active' />
                </div>

                <div className='mt-[16px]'>
                  <div className='mb-[8px] text-[12px] font-semibold uppercase tracking-wider text-slate-400'>Biography</div>
                  <div className='rounded-[12px] border border-slate-100 bg-slate-50 p-[20px] text-[15px] leading-relaxed text-slate-600 italic'>
                    "{model.selectedUser.value.bio || 'This user has not written a bio yet.'}"
                  </div>
                </div>

                <div className='mt-[32px] rounded-[16px] bg-blue-50 p-[24px]'>
                  <div className='font-bold text-blue-800'>Account Meta</div>
                  <div className='mt-[12px] flex flex-col gap-[8px] text-[14px] text-blue-600'>
                    <div className='flex justify-between'>
                      <span>Member since</span>
                      <span className='font-medium'>Jan 2024</span>
                    </div>
                    <div className='flex justify-between'>
                      <span>Total Articles</span>
                      <span className='font-medium'>12</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

const DetailRow: React.FC<{ label: string; value: string; mono?: boolean }> = ({ label, value, mono }) => (
  <div className='mb-[24px]'>
    <div className='mb-[4px] text-[12px] font-semibold uppercase tracking-wider text-slate-400'>{label}</div>
    <div className={`text-[16px] text-slate-800 ${mono ? 'font-mono' : ''}`}>{value}</div>
  </div>
)

export const UsersMemo = memoStrategy(UsersComponent, PropsEq.equals)
