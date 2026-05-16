import React from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import * as O from 'fp-ts/lib/Option'

import { memoStrategy } from '@/common/util'

import { PropsEq, type Props, type TimeFilter, type ErrorLog } from './type'

export const HomeComponent: React.FC<Props> = ({ model, dispatch }) => {
  return (
    <div className='relative flex flex-col gap-[32px]'>
      <div>
        <h2 className='mb-[24px] text-[28px] font-bold text-slate-800'>Overview</h2>
        <div className='grid grid-cols-1 gap-[24px] md:grid-cols-3'>
          <StatCard label='Total Articles' value={model.articleCount.toString()} color='bg-blue-500' />
          <StatCard label='Active Users' value={model.userCount.toString()} color='bg-green-500' />
          <StatCard label='New Comments' value={model.commentCount.toString()} color='bg-purple-500' />
        </div>
      </div>

      <div className='rounded-[16px] bg-white p-[24px] shadow-sm'>
        <div className='mb-[24px] flex flex-col justify-between gap-[16px] sm:flex-row sm:items-center'>
          <h3 className='text-[18px] font-bold text-slate-800'>Visitor Activity</h3>
          <div className='flex flex-wrap gap-[8px] rounded-[8px] bg-slate-100 p-[4px]'>
            <FilterButton
              label='24h'
              active={model.currentFilter === '24h'}
              onClick={() => dispatch({ _tag: 'ChangeFilter', filter: '24h' })}
            />
            <FilterButton
              label='Week'
              active={model.currentFilter === 'week'}
              onClick={() => dispatch({ _tag: 'ChangeFilter', filter: 'week' })}
            />
            <FilterButton
              label='Month'
              active={model.currentFilter === 'month'}
              onClick={() => dispatch({ _tag: 'ChangeFilter', filter: 'month' })}
            />
            <FilterButton
              label='Year'
              active={model.currentFilter === 'year'}
              onClick={() => dispatch({ _tag: 'ChangeFilter', filter: 'year' })}
            />
          </div>
        </div>
        
        <div className='h-[300px] w-full'>
          <ResponsiveContainer width='100%' height='100%'>
            <AreaChart data={model.visitorStats}>
              <defs>
                <linearGradient id='colorVisitors' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor='#3b82f6' stopOpacity={0.1} />
                  <stop offset='95%' stopColor='#3b82f6' stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray='3 3' vertical={false} stroke='#f1f5f9' />
              <XAxis
                dataKey='name'
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748b', fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748b', fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: '8px',
                  border: 'none',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
              />
              <Area
                type='monotone'
                dataKey='visitors'
                stroke='#3b82f6'
                strokeWidth={3}
                fillOpacity={1}
                fill='url(#colorVisitors)'
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className='rounded-[16px] bg-white p-[24px] shadow-sm'>
        <h3 className='mb-[24px] text-[18px] font-bold text-slate-800'>System Logs</h3>
        <div className='overflow-hidden rounded-[8px] border border-slate-100'>
          <table className='w-full text-left'>
            <thead className='bg-slate-50 text-[12px] font-semibold uppercase tracking-wider text-slate-500'>
              <tr>
                <th className='px-[16px] py-[12px]'>Level</th>
                <th className='px-[16px] py-[12px]'>Message</th>
                <th className='px-[16px] py-[12px]'>Source</th>
                <th className='px-[16px] py-[12px]'>Time</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-slate-50 text-[14px]'>
              {model.errorLogs.map((log) => (
                <tr 
                  key={log.id} 
                  className='cursor-pointer hover:bg-slate-50 transition-colors'
                  onClick={() => dispatch({ _tag: 'SelectLog', log: O.some(log) })}
                >
                  <td className='px-[16px] py-[12px]'>
                    <LevelBadge level={log.level} />
                  </td>
                  <td className='px-[16px] py-[12px] font-medium text-slate-700'>
                    <div className='max-w-[500px] truncate font-mono text-[12px]'>{log.message}</div>
                  </td>
                  <td className='px-[16px] py-[12px] font-mono text-[12px] text-slate-500'>{log.source}</td>
                  <td className='px-[16px] py-[12px] text-slate-400'>{new Date(log.timestamp).toLocaleTimeString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Overlay */}
      {O.isSome(model.selectedLog) && (
        <>
          <div 
            className='fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-[2px]' 
            onClick={() => dispatch({ _tag: 'SelectLog', log: O.none })}
          />
          <div className='fixed right-0 top-0 z-50 h-full w-full max-w-[50%] animate-in slide-in-from-right bg-white shadow-2xl duration-300'>
            <div className='flex h-full flex-col'>
              <div className='flex items-center justify-between border-b border-slate-100 p-[24px]'>
                <div className='flex items-center gap-[12px]'>
                  <h3 className='text-[20px] font-bold text-slate-800'>Log Detail</h3>
                  <LevelBadge level={model.selectedLog.value.level} />
                </div>
                <button 
                  onClick={() => dispatch({ _tag: 'SelectLog', log: O.none })}
                  className='rounded-full p-[8px] text-slate-400 hover:bg-slate-50 hover:text-slate-600'
                >
                  ✕
                </button>
              </div>
              <div className='flex-grow overflow-y-auto p-[24px]'>
                <div className='mb-[24px]'>
                  <div className='mb-[8px] text-[12px] font-semibold uppercase tracking-wider text-slate-400'>Event Message</div>
                  <div className='rounded-[12px] border border-slate-100 bg-slate-900 p-[24px] font-mono text-[13px] leading-relaxed text-slate-100 shadow-xl overflow-x-auto whitespace-pre-wrap'>
                    {model.selectedLog.value.message}
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-[24px]'>
                  <DetailRow label='Source' value={model.selectedLog.value.source} mono />
                  <DetailRow label='Occurrence Time' value={new Date(model.selectedLog.value.timestamp).toLocaleString()} />
                </div>
                <div className='mt-[24px] rounded-[12px] bg-slate-50 p-[20px]'>
                  <div className='text-[12px] font-bold text-slate-500 uppercase tracking-wide'>Context Metadata</div>
                  <div className='mt-[12px] space-y-[8px] text-[14px] text-slate-600'>
                    <div className='flex justify-between'>
                      <span>Node ID</span>
                      <span className='font-mono'>node-ap-southeast-1a</span>
                    </div>
                    <div className='flex justify-between'>
                      <span>Environment</span>
                      <span className='text-green-600 font-bold'>Production</span>
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

const LevelBadge: React.FC<{ level: ErrorLog['level'] }> = ({ level }) => {
  const styles = {
    error: 'bg-red-50 text-red-600 border-red-100',
    warning: 'bg-amber-50 text-amber-600 border-amber-100',
    info: 'bg-blue-50 text-blue-600 border-blue-100',
  }

  return (
    <span className={`rounded-full border px-[8px] py-[2px] text-[11px] font-bold uppercase tracking-tight ${styles[level]}`}>
      {level}
    </span>
  )
}

const FilterButton: React.FC<{
  label: string
  active: boolean
  onClick: () => void
}> = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`rounded-[6px] px-[12px] py-[6px] text-[13px] font-medium transition-all ${
      active
        ? 'bg-white text-blue-600 shadow-sm'
        : 'text-slate-500 hover:text-slate-700'
    }`}
  >
    {label}
  </button>
)

const StatCard: React.FC<{ label: string; value: string; color: string }> = ({
  label,
  value,
  color,
}) => (
  <div className='rounded-[12px] bg-white p-[24px] shadow-sm transition-transform hover:scale-[1.02]'>
    <div className={`mb-[12px] h-[4px] w-[40px] rounded-full ${color}`} />
    <div className='text-slate-500'>{label}</div>
    <div className='text-[32px] font-bold text-slate-800'>{value}</div>
  </div>
)

const DetailRow: React.FC<{ label: string; value: string; mono?: boolean }> = ({ label, value, mono }) => (
  <div className='mb-[24px]'>
    <div className='mb-[4px] text-[12px] font-semibold uppercase tracking-wider text-slate-400'>{label}</div>
    <div className={`text-[16px] text-slate-800 ${mono ? 'font-mono' : ''}`}>{value}</div>
  </div>
)

export const HomeMemo = memoStrategy(HomeComponent, PropsEq.equals)
