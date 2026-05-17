import React from 'react'

import { memoStrategy } from '@/common/util'

import { type Props, PropsEq } from './type'

export const LoginComponent: React.FC<Props> = () => {
  return (
    <div className='flex h-full items-center justify-center'>
      <div className='dark:bg-surface-dark w-full max-w-[400px] rounded-[16px] bg-white p-[40px] shadow-lg'>
        <h2 className='text-theme-secondary mb-[32px] text-center text-[24px] font-bold dark:text-white'>
          Admin Login
        </h2>
        <div className='flex flex-col gap-[20px]'>
          <input
            type='text'
            placeholder='Email'
            className='focus:ring-theme-primary w-full rounded-[8px] border border-slate-200 p-[12px] focus:ring-2 focus:outline-none dark:border-white/20 dark:bg-black/20 dark:text-white'
          />
          <input
            type='password'
            placeholder='Password'
            className='focus:ring-theme-primary w-full rounded-[8px] border border-slate-200 p-[12px] focus:ring-2 focus:outline-none dark:border-white/20 dark:bg-black/20 dark:text-white'
          />
          <button
            type='button'
            className='bg-theme-primary hover:bg-theme-primary/90 w-full rounded-[8px] py-[12px] font-bold text-white transition-colors'
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  )
}

export const LoginMemo = memoStrategy(LoginComponent, PropsEq.equals)
