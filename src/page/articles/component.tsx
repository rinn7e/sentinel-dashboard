import React from 'react'
import * as O from 'fp-ts/lib/Option'

import { memoStrategy } from '@/common/util'

import { PropsEq, type Props } from './type'

export const ArticlesComponent: React.FC<Props> = ({ model, dispatch }) => {
  return (
    <div className='relative flex flex-col gap-[24px]'>
      <h2 className='text-[28px] font-bold text-slate-800'>Articles</h2>
      <div className='overflow-x-auto rounded-[12px] bg-white shadow-sm'>
        <table className='w-full text-left'>
          <thead className='bg-slate-50 text-[12px] font-semibold uppercase tracking-wider text-slate-500'>
            <tr>
              <th className='px-[24px] py-[16px]'>ID</th>
              <th className='px-[24px] py-[16px]'>Slug</th>
              <th className='px-[24px] py-[16px]'>Title</th>
              <th className='px-[24px] py-[16px]'>Author</th>
              <th className='px-[24px] py-[16px] text-center'>Favorites</th>
              <th className='px-[24px] py-[16px]'>Created At</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-slate-100 text-[14px]'>
            {model.articles.map((a) => (
              <tr 
                key={a.id} 
                className='cursor-pointer hover:bg-slate-50 transition-colors'
                onClick={() => dispatch({ _tag: 'SelectArticle', article: O.some(a) })}
              >
                <td className='px-[24px] py-[16px] font-mono text-slate-400'>{a.id}</td>
                <td className='px-[24px] py-[16px] font-mono text-[12px] text-slate-500'>{a.slug}</td>
                <td className='px-[24px] py-[16px] font-medium text-slate-800'>{a.title}</td>
                <td className='px-[24px] py-[16px] text-slate-600'>{a.author.username}</td>
                <td className='px-[24px] py-[16px] text-center'>
                  <span className='rounded-full bg-pink-50 px-[10px] py-[4px] text-[12px] font-bold text-pink-500'>
                    ♥ {a.favoritesCount}
                  </span>
                </td>
                <td className='px-[24px] py-[16px] text-slate-400'>{new Date(a.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail Overlay */}
      {O.isSome(model.selectedArticle) && (
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
                <DetailRow label='Title' value={model.selectedArticle.value.title} />
                <DetailRow label='Slug' value={model.selectedArticle.value.slug} mono />
                <DetailRow label='Description' value={model.selectedArticle.value.description} />
                <div className='mb-[24px]'>
                  <div className='mb-[4px] text-[12px] font-semibold uppercase tracking-wider text-slate-400'>Author</div>
                  <div className='flex items-center gap-[12px]'>
                    <img 
                      src={model.selectedArticle.value.author.image || ''} 
                      className='h-[40px] w-[40px] rounded-full object-cover shadow-sm'
                      alt=''
                    />
                    <div>
                      <div className='font-bold text-slate-800'>{model.selectedArticle.value.author.username}</div>
                      <div className='text-[12px] text-slate-400'>{model.selectedArticle.value.author.bio || 'No bio'}</div>
                    </div>
                  </div>
                </div>
                <div className='mb-[24px]'>
                  <div className='mb-[8px] text-[12px] font-semibold uppercase tracking-wider text-slate-400'>Body Content</div>
                  <div className='rounded-[12px] border border-slate-100 bg-slate-50 p-[20px] text-[14px] leading-relaxed text-slate-600'>
                    {model.selectedArticle.value.body}
                  </div>
                </div>
                <div className='flex gap-[24px]'>
                  <DetailRow label='Favorites' value={model.selectedArticle.value.favoritesCount.toString()} />
                  <DetailRow label='Created' value={new Date(model.selectedArticle.value.createdAt).toLocaleString()} />
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

export const ArticlesMemo = memoStrategy(ArticlesComponent, PropsEq.equals)
