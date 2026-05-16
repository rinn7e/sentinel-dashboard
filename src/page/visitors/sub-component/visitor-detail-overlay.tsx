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
        className='fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-[2px]' 
        onClick={() => dispatch({ _tag: 'SelectVisitor', visitor: O.none })}
      />
      <div className='fixed right-0 top-0 z-50 h-full w-full max-w-[50%] animate-in slide-in-from-right bg-white shadow-2xl duration-300'>
        <div className='flex h-full flex-col'>
          <div className='flex items-center justify-between border-b border-slate-100 p-[24px]'>
            <h3 className='text-[20px] font-bold text-slate-800'>Visitor Details</h3>
            <button 
              onClick={() => dispatch({ _tag: 'SelectVisitor', visitor: O.none })}
              className='rounded-full p-[8px] text-slate-400 hover:bg-slate-50 hover:text-slate-600'
            >
              ✕
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
              <div className='mb-[8px] text-[12px] font-semibold uppercase tracking-wider text-slate-400'>User Agent</div>
              <div className='rounded-[8px] bg-slate-50 p-[16px] font-mono text-[12px] leading-relaxed text-slate-600'>
                {visitor.userAgent || 'No User Agent recorded'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
