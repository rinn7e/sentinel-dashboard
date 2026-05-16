import React from 'react'

import { memoStrategy } from '@/common/util'

import { PropsEq, type Props } from './type'

export const CommentsComponent: React.FC<Props> = ({ model }) => {
  return (
    <div className='flex flex-col gap-[24px]'>
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
            {model.comments.map((comment) => (
              <tr key={comment.id} className='hover:bg-slate-50'>
                <td className='px-[24px] py-[16px] font-mono text-slate-400'>{comment.id}</td>
                <td className='px-[24px] py-[16px] font-medium text-slate-800'>{comment.author.username}</td>
                <td className='max-w-[400px] truncate px-[24px] py-[16px] text-slate-600'>{comment.body}</td>
                <td className='px-[24px] py-[16px] text-slate-400'>{new Date(comment.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export const CommentsMemo = memoStrategy(CommentsComponent, PropsEq.equals)
