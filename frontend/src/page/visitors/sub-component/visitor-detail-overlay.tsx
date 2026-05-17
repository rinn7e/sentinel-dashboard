import React from 'react'
import * as O from 'fp-ts/lib/Option'
import { type Dispatcher } from 'tea-cup-fp'

import { type Visitor } from '@/common/api/type/visitor'
import { type Msg } from '../type'
import { DetailRow } from './detail-row'

export const VisitorDetailOverlay: React.FC<{
  selectedVisitor: O.Option<Visitor>
  dispatch: Dispatcher<Msg>
}> = ({ selectedVisitor, dispatch }) => {
  if (O.isNone(selectedVisitor)) return null

  const visitor = selectedVisitor.value

  return (
    <>
      <div 
        className='fixed inset-0 z-40 bg-slate-900/20 dark:bg-black/50 backdrop-blur-[2px]' 
        onClick={() => dispatch({ _tag: 'SelectVisitor', visitor: O.none })}
      />
      <div className='fixed right-0 top-0 z-50 h-full w-full max-w-[50%] animate-in slide-in-from-right bg-white dark:bg-surface-dark shadow-2xl duration-300'>
        <div className='flex h-full flex-col'>
          <div className='flex items-center justify-between border-b border-slate-100 dark:border-white/20 p-[24px]'>
            <h3 className='text-[20px] font-bold text-theme-secondary dark:text-white'>Visitor Details</h3>
            <button 
              onClick={() => dispatch({ _tag: 'SelectVisitor', visitor: O.none })}
              className='rounded-full p-[8px] text-slate-400 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-600 dark:hover:text-white'
            >
              <svg xmlns='http://www.w3.org/2000/svg' className='h-[20px] w-[20px]' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
          </div>
          <div className='flex-grow overflow-y-auto p-[24px]'>
            <DetailRow label='Internal ID' value={visitor.id.toString()} mono />
            <DetailRow label='Fingerprint' value={visitor.browserFingerprint} mono />
            <DetailRow label='IP Address' value={visitor.ipAddress} />
            <DetailRow 
              label='Status' 
              value={visitor.userId ? `Linked to User #${visitor.userId}` : 'Anonymous'} 
            />
            <DetailRow label='Total Visits' value={visitor.visitCount.toString()} />
            <DetailRow label='Last Visit At' value={new Date(visitor.lastVisitAt).toLocaleString()} />
            <div className='mt-[24px]'>
              <div className='mb-[8px] text-[12px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-200'>User Agent</div>
              <div className='rounded-[8px] bg-slate-50 dark:bg-black/20 p-[16px] font-mono text-[12px] leading-relaxed text-slate-600 dark:text-slate-200'>
                {visitor.userAgent || 'No User Agent recorded'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
