import * as O from 'fp-ts/lib/Option'
import React from 'react'

import { memoStrategy } from '@/common/util'
import { SearchBar, type SearchOption } from '@/component/search-bar'

import { VisitorDetailOverlay } from './sub-component/visitor-detail-overlay'
import { type Props, PropsEq } from './type'

const sortOptions: SearchOption[] = [
  { label: 'Last Visit', value: 'lastVisitAt' },
  { label: 'Visit Count', value: 'visitCount' },
  { label: 'ID', value: 'id' },
]

export const VisitorsComponent: React.FC<Props> = ({ model, dispatch }) => {
  return (
    <div className='relative flex flex-col gap-[32px]'>
      <div className='flex flex-col gap-[24px]'>
        <h2 className='text-theme-secondary text-[28px] font-bold dark:text-white'>
          Visitors
        </h2>
        <SearchBar
          searchText={model.searchText}
          sort={model.sort}
          sortOptions={sortOptions}
          onSearchChange={(text) =>
            dispatch({ _tag: 'ChangeSearchText', text })
          }
          onSortChange={(sort) => dispatch({ _tag: 'ChangeSort', sort })}
          placeholder='Search visitors by IP, fingerprint, or User Agent...'
        />
      </div>

      <div className='dark:bg-surface-dark overflow-x-auto rounded-[12px] bg-white shadow-sm'>
        <table className='w-full text-left'>
          <thead className='bg-slate-50 text-[12px] font-semibold tracking-wider text-slate-500 uppercase dark:bg-black/20 dark:text-slate-200'>
            <tr>
              <th className='px-[24px] py-[16px]'>ID</th>
              <th className='px-[24px] py-[16px]'>Fingerprint</th>
              <th className='px-[24px] py-[16px]'>IP Address</th>
              <th className='px-[24px] py-[16px]'>User ID</th>
              <th className='px-[24px] py-[16px]'>Visits</th>
              <th className='px-[24px] py-[16px]'>Last Seen</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-slate-100 text-[14px] dark:divide-white/20'>
            {model.visitors.map((v) => (
              <tr
                key={v.id}
                className='cursor-pointer transition-colors hover:bg-slate-50 dark:hover:bg-white/5'
                onClick={() =>
                  dispatch({ _tag: 'SelectVisitor', visitor: O.some(v) })
                }
              >
                <td className='px-[24px] py-[16px] font-mono text-slate-400 dark:text-slate-200'>
                  {v.id}
                </td>
                <td className='px-[24px] py-[16px] font-mono text-[12px] text-slate-600 dark:text-slate-200'>
                  {v.browserFingerprint.substring(0, 12)}...
                </td>
                <td className='text-theme-secondary px-[24px] py-[16px] dark:text-white'>
                  {v.ipAddress}
                </td>
                <td className='px-[24px] py-[16px]'>
                  {v.userId ? (
                    <span className='bg-theme-primary/10 text-theme-primary rounded-full px-[8px] py-[2px] font-medium'>
                      User #{v.userId}
                    </span>
                  ) : (
                    <span className='text-slate-400 dark:text-slate-600'>
                      Anonymous
                    </span>
                  )}
                </td>
                <td className='px-[24px] py-[16px] font-bold text-slate-700 dark:text-slate-200'>
                  {v.visitCount}
                </td>
                <td className='px-[24px] py-[16px] text-slate-400 dark:text-slate-200'>
                  {new Date(v.lastVisitAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <VisitorDetailOverlay
        selectedVisitor={model.selectedVisitor}
        dispatch={dispatch}
      />
    </div>
  )
}

export const VisitorsMemo = memoStrategy(VisitorsComponent, PropsEq.equals)
