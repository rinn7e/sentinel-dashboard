import React from 'react'
import * as O from 'fp-ts/lib/Option'

import { memoStrategy } from '@/common/util'

import { PropsEq, type Props } from './type'

export const CommentsComponent: React.FC<Props> = ({ model, dispatch }) => {
  return (
    <div className='relative flex flex-col gap-[24px]'>
      <h2 className='text-[28px] font-bold text-slate-800'>Comments</h2>
      <div className='overflow-x-auto rounded-[12px] bg-white shadow-sm'>
        <table className='w-full text-left'>
          <thead className='bg-slate-50 text-[12px] font-semibold uppercase tracking-wider text-slate-500'>
            <tr>
              <th className='px-[24px] py-[16px]'>ID</th>
              <th className='px-[24px] py-[16px]'>Author</th>
              <th className='px-[24px] py-[16px]'>Body</th>
              <th className='px-[24px] py-[16px]'>Created At</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-slate-100 text-[14px]'>
            {model.comments.map((c) => (
              <tr 
                key={c.id} 
                className='cursor-pointer hover:bg-slate-50 transition-colors'
                onClick={() => dispatch({ _tag: 'SelectComment', comment: O.some(c) })}
              >
                <td className='px-[24px] py-[16px] font-mono text-slate-400'>{c.id}</td>
                <td className='px-[24px] py-[16px] font-medium text-slate-800'>{c.author.username}</td>
                <td className='px-[24px] py-[16px] text-slate-600 max-w-[400px] truncate'>{c.body}</td>
                <td className='px-[24px] py-[16px] text-slate-400'>{new Date(c.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail Overlay */}
      {O.isSome(model.selectedComment) && (
        <>
          <div 
            className='fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-[2px]' 
            onClick={() => dispatch({ _tag: 'SelectComment', comment: O.none })}
          />
          <div className='fixed right-0 top-0 z-50 h-full w-full max-w-[50%] animate-in slide-in-from-right bg-white shadow-2xl duration-300'>
            <div className='flex h-full flex-col'>
              <div className='flex items-center justify-between border-b border-slate-100 p-[24px]'>
                <h3 className='text-[20px] font-bold text-slate-800'>Comment Details</h3>
                <button 
                  onClick={() => dispatch({ _tag: 'SelectComment', comment: O.none })}
                  className='rounded-full p-[8px] text-slate-400 hover:bg-slate-50 hover:text-slate-600'
                >
                  ✕
                </button>
              </div>
              <div className='flex-grow overflow-y-auto p-[24px]'>
                <div className='mb-[32px]'>
                  <div className='mb-[4px] text-[12px] font-semibold uppercase tracking-wider text-slate-400'>Author</div>
                  <div className='flex items-center gap-[12px]'>
                    <img 
                      src={model.selectedComment.value.author.image || ''} 
                      className='h-[32px] w-[32px] rounded-full object-cover shadow-sm'
                      alt=''
                    />
                    <div className='font-bold text-slate-800'>{model.selectedComment.value.author.username}</div>
                  </div>
                </div>

                <div className='mb-[32px]'>
                  <div className='mb-[8px] text-[12px] font-semibold uppercase tracking-wider text-slate-400'>Comment Message</div>
                  <div className='rounded-[12px] border border-slate-100 bg-slate-50 p-[24px] text-[16px] leading-relaxed text-slate-700 shadow-inner'>
                    {model.selectedComment.value.body}
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-[24px]'>
                  <DetailRow label='Comment ID' value={model.selectedComment.value.id.toString()} mono />
                  <DetailRow label='Created At' value={new Date(model.selectedComment.value.createdAt).toLocaleString()} />
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

export const CommentsMemo = memoStrategy(CommentsComponent, PropsEq.equals)
