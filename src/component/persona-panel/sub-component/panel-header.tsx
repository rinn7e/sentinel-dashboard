import React from 'react'

export const PanelHeader: React.FC<{
  name: string
  onToggleDetails: () => void
  onToggleCollapse: () => void
}> = ({ name, onToggleDetails, onToggleCollapse }) => (
  <div className='flex items-center justify-between p-[24px] border-b border-indigo-500/20'>
    <button 
      onClick={onToggleDetails}
      className='text-[18px] font-black tracking-widest text-indigo-300 uppercase hover:underline decoration-indigo-500/50 underline-offset-4'
    >
      {name}
    </button>
    <button
      type='button'
      onClick={onToggleCollapse}
      className='text-slate-500 hover:text-white transition-colors'
    >
      <svg xmlns='http://www.w3.org/2000/svg' className='h-[24px] w-[24px]' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
      </svg>
    </button>
  </div>
)
