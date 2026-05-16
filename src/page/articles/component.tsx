import React from 'react'
import * as O from 'fp-ts/lib/Option'

import { SearchBar, type SearchOption } from '@/component/search-bar'
import { memoStrategy } from '@/common/util'

import { ArticleDetailOverlay } from './sub-component/article-detail-overlay'
import { PropsEq, type Props } from './type'

const sortOptions: SearchOption[] = [
  { label: 'Creation Date', value: 'createdAt' },
  { label: 'Favorites', value: 'favoritesCount' },
  { label: 'Title', value: 'title' },
  { label: 'ID', value: 'id' },
]

export const ArticlesComponent: React.FC<Props> = ({ model, dispatch }) => {
  return (
    <div className='relative flex flex-col gap-[32px]'>
      <div className='flex flex-col gap-[24px]'>
        <h2 className='text-[28px] font-bold text-slate-800'>Articles</h2>
        <SearchBar
          searchText={model.searchText}
          sort={model.sort}
          sortOptions={sortOptions}
          onSearchChange={(text) => dispatch({ _tag: 'ChangeSearchText', text })}
          onSortChange={(sort) => dispatch({ _tag: 'ChangeSort', sort })}
          placeholder='Search articles by title, slug, or content...'
        />
      </div>

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

      <ArticleDetailOverlay 
        selectedArticle={model.selectedArticle} 
        dispatch={dispatch} 
      />
    </div>
  )
}

export const ArticlesMemo = memoStrategy(ArticlesComponent, PropsEq.equals)
