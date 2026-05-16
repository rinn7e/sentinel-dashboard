import React from 'react'
import { type Persona } from '../type'
import { personas } from '../persona'

export const ActionSection: React.FC<{
  currentPersonaId: string
  onClearCache: () => void
  onSwitchPersona: (persona: Persona) => void
}> = ({ currentPersonaId, onClearCache, onSwitchPersona }) => {
  const personaList = [personas.antigravity, personas.hinata, personas.hinataAndroid]

  return (
    <div className='space-y-[12px]'>
      <div className='space-y-[8px]'>
        <button
          onClick={onClearCache}
          className='group flex w-full items-center justify-between rounded-[8px] border border-indigo-500/20 bg-slate-900/50 p-[16px] text-left transition-all hover:bg-red-500/10 hover:border-red-500/50'
        >
          <span className='text-[14px] font-black text-white uppercase tracking-wider'>Clear Cache and Reload</span>
          <div className='opacity-0 group-hover:opacity-100 transition-opacity'>
            <svg xmlns='http://www.w3.org/2000/svg' className='h-[18px] w-[18px] text-red-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 7l5 5m0 0l-5 5m5-5H6' />
            </svg>
          </div>
        </button>

        <button
          className='group flex w-full items-center justify-between rounded-[8px] border border-indigo-500/20 bg-slate-900/50 p-[16px] text-left transition-all hover:bg-indigo-500/10 hover:border-indigo-500/50'
        >
          <span className='text-[14px] font-black text-white uppercase tracking-wider'>Show Debug</span>
          <div className='opacity-0 group-hover:opacity-100 transition-opacity'>
            <svg xmlns='http://www.w3.org/2000/svg' className='h-[18px] w-[18px] text-indigo-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 7l5 5m0 0l-5 5m5-5H6' />
            </svg>
          </div>
        </button>

        <button
          onClick={() => window.history.back()}
          className='group flex w-full items-center justify-between rounded-[8px] border border-indigo-500/20 bg-slate-900/50 p-[16px] text-left transition-all hover:bg-indigo-500/10 hover:border-indigo-500/50'
        >
          <span className='text-[14px] font-black text-white uppercase tracking-wider'>Trigger Browser Back Button</span>
          <div className='opacity-0 group-hover:opacity-100 transition-opacity'>
            <svg xmlns='http://www.w3.org/2000/svg' className='h-[18px] w-[18px] text-indigo-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 7l5 5m0 0l-5 5m5-5H6' />
            </svg>
          </div>
        </button>
      </div>

      <div className='h-[1px] w-full bg-indigo-500/10 my-[8px]' />

      <div className='space-y-[8px]'>
        <span className='text-[10px] font-bold text-indigo-400 uppercase tracking-widest pl-[4px]'>Persona Selection</span>
        <div className='grid grid-cols-3 gap-[8px]'>
          {personaList.map((p) => (
            <button
              key={p.id}
              onClick={() => onSwitchPersona(p)}
              className={`flex flex-col items-center justify-center rounded-[8px] border p-[8px] transition-all ${
                currentPersonaId === p.id 
                  ? 'border-indigo-500 bg-indigo-500/20 shadow-[0_0_10px_rgba(99,102,241,0.3)]' 
                  : 'border-indigo-500/20 bg-slate-900/50 hover:border-indigo-500/40 hover:bg-indigo-500/5'
              }`}
            >
              <span className={`text-[10px] font-black uppercase tracking-tight ${currentPersonaId === p.id ? 'text-white' : 'text-slate-400'}`}>
                {p.id === 'hinata' ? 'Hyuga' : p.id === 'hinata-android' ? 'Model-B' : 'AG-Core'}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
