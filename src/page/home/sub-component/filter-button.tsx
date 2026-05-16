import React from 'react'

export const FilterButton: React.FC<{
  label: string
  active: boolean
  onClick: () => void
}> = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`rounded-[6px] px-[12px] py-[6px] text-[13px] font-medium transition-all ${
      active
        ? 'bg-white dark:bg-surface-dark text-theme-primary shadow-sm'
        : 'text-slate-500 dark:text-slate-200 hover:text-slate-700 dark:hover:text-slate-200'
    }`}
  >
    {label}
  </button>
)
