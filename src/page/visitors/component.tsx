import React from 'react'
import * as O from 'fp-ts/lib/Option'

import { memoStrategy } from '@/common/util'

import { PropsEq, type Props } from './type'

export const VisitorsComponent: React.FC<Props> = ({ model, dispatch }) => {
  return (
    <div className='relative flex flex-col gap-[24px]'>
      <h2 className='text-[28px] font-bold text-slate-800'>Visitors</h2>
      <div className='overflow-x-auto rounded-[12px] bg-white shadow-sm'>
        <table className='w-full text-left'>
          <thead className='bg-slate-50 text-[12px] font-semibold uppercase tracking-wider text-slate-500'>
            <tr>
              <th className='px-[24px] py-[16px]'>ID</th>
              <th className='px-[24px] py-[16px]'>Fingerprint</th>
              <th className='px-[24px] py-[16px]'>IP Address</th>
              <th className='px-[24px] py-[16px]'>User ID</th>
              <th className='px-[24px] py-[16px]'>Visits</th>
              <th className='px-[24px] py-[16px]'>Last Seen</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-slate-100 text-[14px]'>
            {model.visitors.map((v) => (
              <tr 
                key={v.id} 
                className='cursor-pointer hover:bg-slate-50 transition-colors'
                onClick={() => dispatch({ _tag: 'SelectVisitor', visitor: O.some(v) })}
              >
                <td className='px-[24px] py-[16px] font-mono text-slate-400'>{v.id}</td>
                <td className='px-[24px] py-[16px] font-mono text-[12px] text-slate-600'>
                  {v.browserFingerprint.substring(0, 12)}...
                </td>
                <td className='px-[24px] py-[16px] text-slate-800'>{v.ipAddress}</td>
                <td className='px-[24px] py-[16px]'>
                  {v.userId ? (
                    <span className='rounded-full bg-blue-50 px-[8px] py-[2px] text-blue-600 font-medium'>
                      User #{v.userId}
                    </span>
                  ) : (
                    <span className='text-slate-300'>Anonymous</span>
                  )}
                </td>
                <td className='px-[24px] py-[16px] font-bold text-slate-700'>{v.visitCount}</td>
                <td className='px-[24px] py-[16px] text-slate-400'>{new Date(v.lastVisitAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail Overlay */}
      {O.isSome(model.selectedVisitor) && (
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
                <DetailRow label='Internal ID' value={model.selectedVisitor.value.id.toString()} mono />
                <DetailRow label='Fingerprint' value={model.selectedVisitor.value.browserFingerprint} mono />
                <DetailRow label='IP Address' value={model.selectedVisitor.value.ipAddress} />
                <DetailRow 
                  label='Status' 
                  value={model.selectedVisitor.value.userId ? `Linked to User #${model.selectedVisitor.value.userId}` : 'Anonymous'} 
                />
                <DetailRow label='Total Visits' value={model.selectedVisitor.value.visitCount.toString()} />
                <DetailRow label='Last Visit At' value={new Date(model.selectedVisitor.value.lastVisitAt).toLocaleString()} />
                <div className='mt-[24px]'>
                  <div className='mb-[8px] text-[12px] font-semibold uppercase tracking-wider text-slate-400'>User Agent</div>
                  <div className='rounded-[8px] bg-slate-50 p-[16px] font-mono text-[12px] leading-relaxed text-slate-600'>
                    {model.selectedVisitor.value.userAgent || 'No User Agent recorded'}
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

export const VisitorsMemo = memoStrategy(VisitorsComponent, PropsEq.equals)
