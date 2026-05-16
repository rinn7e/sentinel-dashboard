import React from 'react'
import * as O from 'fp-ts/lib/Option'
import { type Dispatcher } from 'tea-cup-fp'

import { type Comment } from '@/common/api/type/comment'
import { type Msg } from '../type'
import { DetailRow } from './detail-row'

export const CommentDetailOverlay: React.FC<{
  selectedComment: O.Option<Comment>
  dispatch: Dispatcher<Msg>
}> = ({ selectedComment, dispatch }) => {
  if (O.isNone(selectedComment)) return null

  const comment = selectedComment.value

  return (
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
                  src={comment.author.image || ''} 
                  className='h-[32px] w-[32px] rounded-full object-cover shadow-sm'
                  alt=''
                />
                <div className='font-bold text-slate-800'>{comment.author.username}</div>
              </div>
            </div>

            <div className='mb-[32px]'>
              <div className='mb-[8px] text-[12px] font-semibold uppercase tracking-wider text-slate-400'>Comment Message</div>
              <div className='rounded-[12px] border border-slate-100 bg-slate-50 p-[24px] text-[16px] leading-relaxed text-slate-700 shadow-inner'>
                {comment.body}
              </div>
            </div>

            <div className='grid grid-cols-2 gap-[24px]'>
              <DetailRow label='Comment ID' value={comment.id.toString()} mono />
              <DetailRow label='Created At' value={new Date(comment.createdAt).toLocaleString()} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
