import React from 'react'

export const DialogueSection: React.FC<{
  showDetails: boolean
  bio: string
  dialogue: string
  onToggleDetails: () => void
}> = ({ showDetails, bio, dialogue, onToggleDetails }) => (
  <div className='mb-[24px] text-[13px] leading-relaxed text-indigo-100 font-medium italic'>
    {showDetails ? (
      <div className='space-y-[12px]'>
        <p>"{bio}"</p>
        <button 
          onClick={onToggleDetails}
          className='text-[10px] font-bold text-indigo-500 uppercase hover:text-indigo-300'
        >
          Back
        </button>
      </div>
    ) : (
      <p>"{dialogue}"</p>
    )}
  </div>
)
