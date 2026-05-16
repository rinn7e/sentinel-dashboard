import React from 'react'

import { memoStrategy } from '@/common/util'

import { PropsEq, type Props } from './type'

export const HomeComponent: React.FC<Props> = ({ model }) => {
  return (
    <div>
      <h2 className='mb-[24px] text-[28px] font-bold text-slate-800'>Overview</h2>
      <div className='grid grid-cols-1 gap-[24px] md:grid-cols-3'>
        <StatCard label='Total Articles' value={model.articleCount.toString()} color='bg-blue-500' />
        <StatCard label='Active Users' value={model.userCount.toString()} color='bg-green-500' />
        <StatCard label='New Comments' value={model.commentCount.toString()} color='bg-purple-500' />
      </div>
    </div>
  )
}

const StatCard: React.FC<{ label: string; value: string; color: string }> = ({
  label,
  value,
  color,
}) => (
  <div className='rounded-[12px] bg-white p-[24px] shadow-sm'>
    <div className={`mb-[12px] h-[4px] w-[40px] rounded-full ${color}`} />
    <div className='text-slate-500'>{label}</div>
    <div className='text-[32px] font-bold text-slate-800'>{value}</div>
  </div>
)

export const HomeMemo = memoStrategy(HomeComponent, PropsEq.equals)
