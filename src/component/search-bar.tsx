import React from 'react'
import { type Sort } from '@/common/type/filter'

export type SearchOption = {
  label: string
  value: string
}

type Props = {
  searchText: string
  sort: Sort
  sortOptions: SearchOption[]
  onSearchChange: (text: string) => void
  onSortChange: (sort: Sort) => void
  placeholder?: string
}

export const SearchBar: React.FC<Props> = ({
  searchText,
  sort,
  sortOptions,
  onSearchChange,
  onSortChange,
  placeholder = 'Search...',
}) => {
  return (
    <div className='flex flex-col gap-[16px] lg:flex-row lg:items-center'>
      <div className='flex flex-grow items-center gap-[16px] rounded-[16px] bg-white p-[16px] shadow-sm border border-slate-100 focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-50 transition-all'>
        <div className='text-slate-400 pl-[4px]'>
          <svg xmlns='http://www.w3.org/2000/svg' className='h-[24px] w-[24px]' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
          </svg>
        </div>
        <input
          type='text'
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          className='flex-grow bg-transparent text-[18px] font-medium outline-none placeholder:text-slate-300 text-slate-700'
        />
        {searchText && (
          <button
            onClick={() => onSearchChange('')}
            className='rounded-full bg-slate-100 p-[4px] text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-colors'
          >
            <svg xmlns='http://www.w3.org/2000/svg' className='h-[16px] w-[16px]' viewBox='0 0 20 20' fill='currentColor'>
              <path fillRule='evenodd' d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z' clipRule='evenodd' />
            </svg>
          </button>
        )}
      </div>

      <div className='flex items-center gap-[12px] rounded-[16px] bg-white p-[8px] shadow-sm border border-slate-100'>
        <div className='pl-[12px] text-[12px] font-bold text-slate-400 uppercase tracking-wider'>Sort By</div>
        <select
          value={sort.attr}
          onChange={(e) => onSortChange({ ...sort, attr: e.target.value })}
          className='bg-slate-50 px-[16px] py-[10px] rounded-[10px] text-[14px] font-bold text-slate-600 outline-none border border-slate-100 cursor-pointer hover:bg-slate-100 transition-colors'
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <button
          onClick={() => onSortChange({ ...sort, direction: sort.direction === 'asc' ? 'desc' : 'asc' })}
          className='flex items-center gap-[8px] rounded-[10px] bg-blue-50 px-[16px] py-[10px] text-[14px] font-bold text-blue-600 hover:bg-blue-100 transition-colors'
        >
          {sort.direction === 'asc' ? '↑ ASC' : '↓ DESC'}
        </button>
      </div>
    </div>
  )
}
