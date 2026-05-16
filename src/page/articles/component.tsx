import React from 'react'

import { memoStrategy } from '@/common/util'

import { PropsEq, type Props } from './type'

export const ArticlesComponent: React.FC<Props> = ({ model }) => {
  return (
    <div className='flex flex-col gap-[24px]'>
      <h2 className='text-[28px] font-bold text-slate-800'>Articles</h2>
      <div className='overflow-x-auto rounded-[12px] bg-white shadow-sm'>
        <table className='w-full text-left'>
          <thead className='bg-slate-50 text-[12px] font-semibold uppercase tracking-wider text-slate-500'>
            <tr>
              <th className='px-[24px] py-[16px]'>ID</th>
              <th className='px-[24px] py-[16px]'>Slug</th>
              <th className='px-[24px] py-[16px]'>Title</th>
              <th className='px-[24px] py-[16px]'>Author</th>
              <th className='px-[24px] py-[16px]'>Favorites</th>
              <th className='px-[24px] py-[16px]'>Created At</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-slate-100 text-[14px]'>
            {model.articles.map((article) => (
              <tr key={article.id} className='hover:bg-slate-50'>
                <td className='px-[24px] py-[16px] font-mono text-slate-400'>{article.id}</td>
                <td className='px-[24px] py-[16px] font-medium text-blue-600'>{article.slug}</td>
                <td className='px-[24px] py-[16px] text-slate-800'>{article.title}</td>
                <td className='px-[24px] py-[16px] text-slate-600'>{article.author.username}</td>
                <td className='px-[24px] py-[16px] text-slate-600'>{article.favoritesCount}</td>
                <td className='px-[24px] py-[16px] text-slate-400'>{new Date(article.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export const ArticlesMemo = memoStrategy(ArticlesComponent, PropsEq.equals)
