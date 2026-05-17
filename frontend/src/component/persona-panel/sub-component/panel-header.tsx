import React from 'react'

export const PanelHeader: React.FC<{
  name: string
  onToggleDetails: () => void
  onToggleCollapse: () => void
}> = ({ name, onToggleDetails, onToggleCollapse }) => (
  <div className='flex items-center justify-between p-[24px] border-b border-theme-primary/20'>
    <button 
      onClick={onToggleDetails}
      className='text-[18px] font-black tracking-widest text-theme-primary uppercase hover:underline decoration-theme-primary/50 underline-offset-4'
    >
      {name}
    </button>
    <button
      type='button'
      onClick={onToggleCollapse}
      className='text-white/40 hover:text-white transition-colors'
    >
      <svg xmlns='http://www.w3.org/2000/svg' className='h-[24px] w-[24px]' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
      </svg>
    </button>
  </div>
)
