import React from 'react'
import * as O from 'fp-ts/lib/Option'

import { SearchBar, type SearchOption } from '@/component/search-bar'
import { memoStrategy } from '@/common/util'

import { VisitorDetailOverlay } from './sub-component/visitor-detail-overlay'
import { PropsEq, type Props } from './type'

const sortOptions: SearchOption[] = [
  { label: 'Last Visit', value: 'lastVisitAt' },
  { label: 'Visit Count', value: 'visitCount' },
  { label: 'ID', value: 'id' },
]

export const VisitorsComponent: React.FC<Props> = ({ model, dispatch }) => {
  return (
    <div className='relative flex flex-col gap-[32px]'>
      <div className='flex flex-col gap-[24px]'>
        <h2 className='text-[28px] font-bold text-slate-800'>Visitors</h2>
        <SearchBar
          searchText={model.searchText}
          sort={model.sort}
          sortOptions={sortOptions}
          onSearchChange={(text) => dispatch({ _tag: 'ChangeSearchText', text })}
          onSortChange={(sort) => dispatch({ _tag: 'ChangeSort', sort })}
          placeholder='Search visitors by IP, fingerprint, or User Agent...'
        />
      </div>

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

      <VisitorDetailOverlay 
        selectedVisitor={model.selectedVisitor} 
        dispatch={dispatch} 
      />
    </div>
  )
}

export const VisitorsMemo = memoStrategy(VisitorsComponent, PropsEq.equals)
