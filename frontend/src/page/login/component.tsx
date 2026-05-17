import React from 'react'

import { memoStrategy } from '@/common/util'

import { PropsEq, type Props } from './type'

export const LoginComponent: React.FC<Props> = () => {
  return (
    <div className='flex h-full items-center justify-center'>
      <div className='w-full max-w-[400px] rounded-[16px] bg-white dark:bg-surface-dark p-[40px] shadow-lg'>
        <h2 className='mb-[32px] text-center text-[24px] font-bold text-theme-secondary dark:text-white'>Admin Login</h2>
        <div className='flex flex-col gap-[20px]'>
          <input
            type='text'
            placeholder='Email'
            className='w-full rounded-[8px] border border-slate-200 dark:border-white/20 dark:bg-black/20 dark:text-white p-[12px] focus:outline-none focus:ring-2 focus:ring-theme-primary'
          />
          <input
            type='password'
            placeholder='Password'
            className='w-full rounded-[8px] border border-slate-200 dark:border-white/20 dark:bg-black/20 dark:text-white p-[12px] focus:outline-none focus:ring-2 focus:ring-theme-primary'
          />
          <button className='w-full rounded-[8px] bg-theme-primary py-[12px] font-bold text-white transition-colors hover:bg-theme-primary/90'>
            Sign In
          </button>
        </div>
      </div>
    </div>
  )
}

export const LoginMemo = memoStrategy(LoginComponent, PropsEq.equals)
