import React from 'react'
import * as O from 'fp-ts/lib/Option'
import { type Dispatcher } from 'tea-cup-fp'

import { type ErrorLog, type Msg } from '../type'
import { LevelBadge } from './level-badge'
import { DetailRow } from './detail-row'

export const LogDetailOverlay: React.FC<{
  selectedLog: O.Option<ErrorLog>
  dispatch: Dispatcher<Msg>
}> = ({ selectedLog, dispatch }) => {
  if (O.isNone(selectedLog)) return null

  const log = selectedLog.value

  return (
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
              <LevelBadge level={log.level} />
            </div>
            <button 
              onClick={() => dispatch({ _tag: 'SelectLog', log: O.none })}
              className='rounded-full p-[8px] text-slate-400 hover:bg-slate-50 hover:text-slate-600'
            >
              <svg xmlns='http://www.w3.org/2000/svg' className='h-[20px] w-[20px]' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
          </div>
          <div className='flex-grow overflow-y-auto p-[24px]'>
            <div className='mb-[24px]'>
              <div className='mb-[8px] text-[12px] font-semibold uppercase tracking-wider text-slate-400'>Event Message</div>
              <div className='rounded-[12px] border border-slate-100 bg-slate-900 p-[24px] font-mono text-[13px] leading-relaxed text-slate-100 shadow-xl overflow-x-auto whitespace-pre-wrap'>
                {log.message}
              </div>
            </div>
            <div className='grid grid-cols-2 gap-[24px]'>
              <DetailRow label='Source' value={log.source} mono />
              <DetailRow label='Occurrence Time' value={new Date(log.timestamp).toLocaleString()} />
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
  )
}
