import React from 'react'

export const HeroSection: React.FC<{ portraitUrl: string }> = ({ portraitUrl }) => {
  return (
    <div className='absolute inset-0 overflow-hidden bg-black flex justify-center items-start'>
      <div className='w-full h-full flex justify-center items-start animate-persona p-[40px]'>
        <img 
          src={portraitUrl} 
          className='h-full w-full object-contain object-top'
          alt='Persona Portrait'
        />
      </div>
      <div className='absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black' />
    </div>
  )
}
