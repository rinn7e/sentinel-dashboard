import React from 'react'
import * as O from 'fp-ts/lib/Option'
import { type Dispatcher } from 'tea-cup-fp'

import { type Article } from '@/common/api/type/article'
import { type Msg } from '../type'
import { DetailRow } from './detail-row'

export const ArticleDetailOverlay: React.FC<{
  selectedArticle: O.Option<Article>
  dispatch: Dispatcher<Msg>
}> = ({ selectedArticle, dispatch }) => {
  if (O.isNone(selectedArticle)) return null

  const article = selectedArticle.value

  return (
    <>
      <div 
        className='fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-[2px]' 
        onClick={() => dispatch({ _tag: 'SelectArticle', article: O.none })}
      />
      <div className='fixed right-0 top-0 z-50 h-full w-full max-w-[50%] animate-in slide-in-from-right bg-white shadow-2xl duration-300'>
        <div className='flex h-full flex-col'>
          <div className='flex items-center justify-between border-b border-slate-100 p-[24px]'>
            <h3 className='text-[20px] font-bold text-slate-800'>Article Details</h3>
            <button 
              onClick={() => dispatch({ _tag: 'SelectArticle', article: O.none })}
              className='rounded-full p-[8px] text-slate-400 hover:bg-slate-50 hover:text-slate-600'
            >
              ✕
            </button>
          </div>
          <div className='flex-grow overflow-y-auto p-[24px]'>
            <DetailRow label='Title' value={article.title} />
            <DetailRow label='Slug' value={article.slug} mono />
            <DetailRow label='Description' value={article.description} />
            <div className='mb-[24px]'>
              <div className='mb-[4px] text-[12px] font-semibold uppercase tracking-wider text-slate-400'>Author</div>
              <div className='flex items-center gap-[12px]'>
                <img 
                  src={article.author.image || ''} 
                  className='h-[40px] w-[40px] rounded-full object-cover shadow-sm'
                  alt=''
                />
                <div>
                  <div className='font-bold text-slate-800'>{article.author.username}</div>
                  <div className='text-[12px] text-slate-400'>{article.author.bio || 'No bio'}</div>
                </div>
              </div>
            </div>
            <div className='mb-[24px]'>
              <div className='mb-[8px] text-[12px] font-semibold uppercase tracking-wider text-slate-400'>Body Content</div>
              <div className='rounded-[12px] border border-slate-100 bg-slate-50 p-[20px] text-[14px] leading-relaxed text-slate-600'>
                {article.body}
              </div>
            </div>
            <div className='flex gap-[24px]'>
              <DetailRow label='Favorites' value={article.favoritesCount.toString()} />
              <DetailRow label='Created' value={new Date(article.createdAt).toLocaleString()} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
