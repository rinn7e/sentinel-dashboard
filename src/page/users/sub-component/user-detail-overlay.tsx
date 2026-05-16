import React from 'react'
import * as O from 'fp-ts/lib/Option'
import { type Dispatcher } from 'tea-cup-fp'

import { type User } from '@/common/api/type/user'
import { type Msg } from '../type'
import { DetailRow } from './detail-row'

export const UserDetailOverlay: React.FC<{
  selectedUser: O.Option<User>
  dispatch: Dispatcher<Msg>
}> = ({ selectedUser, dispatch }) => {
  if (O.isNone(selectedUser)) return null

  const user = selectedUser.value

  return (
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
                src={user.image || ''} 
                className='h-[100px] w-[100px] rounded-[24px] object-cover shadow-lg border-4 border-white'
                alt=''
              />
              <div>
                <div className='text-[24px] font-bold text-slate-800'>{user.username}</div>
                <div className='text-slate-500'>{user.email}</div>
              </div>
            </div>
            
            <div className='grid grid-cols-2 gap-[24px]'>
              <DetailRow label='User ID' value={user.id.toString()} mono />
              <DetailRow label='Account Status' value='Active' />
            </div>

            <div className='mt-[16px]'>
              <div className='mb-[8px] text-[12px] font-semibold uppercase tracking-wider text-slate-400'>Biography</div>
              <div className='rounded-[12px] border border-slate-100 bg-slate-50 p-[20px] text-[15px] leading-relaxed text-slate-600 italic'>
                "{user.bio || 'This user has not written a bio yet.'}"
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
  )
}
