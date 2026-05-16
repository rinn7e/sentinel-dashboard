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
        ? 'bg-white text-blue-600 shadow-sm'
        : 'text-slate-500 hover:text-slate-700'
    }`}
  >
    {label}
  </button>
)
