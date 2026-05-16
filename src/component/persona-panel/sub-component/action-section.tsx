import { domToPng } from 'modern-screenshot'
import React from 'react'

import { personas } from '../persona'
import { type Persona } from '../type'
import { themes } from '@/theme/data'
import { type Theme } from '@/theme/type'

export const ActionSection: React.FC<{
  currentPersonaId: string
  currentThemeId: string
  onClearCache: () => void
  onToggleCollapse: () => void
  onSwitchPersona: (persona: Persona) => void
  onSwitchTheme: (theme: Theme) => void
}> = ({
  currentPersonaId,
  currentThemeId,
  onClearCache,
  onToggleCollapse,
  onSwitchPersona,
  onSwitchTheme,
}) => {
  const personaList = [
    personas.flashAg,
    personas.hinata,
    personas.hinataAndroid,
  ]

  const themesList = Object.values(themes)

  const takeScreenshot = async () => {
    onToggleCollapse()
    // Small delay to ensure the DOM has updated and panel is collapsed
    await new Promise((resolve) => setTimeout(resolve, 100))

    try {
      const dataUrl = await domToPng(document.body, {
        filter: (node) => {
          if (
            node instanceof HTMLElement &&
            node.hasAttribute('data-html2canvas-ignore')
          ) {
            return false
          }
          return true
        },
      })

      const link = document.createElement('a')
      link.href = dataUrl
      link.download = `system-capture-${new Date().getTime()}.png`
      link.click()
    } catch (error) {
      console.error('Screenshot failed:', error)
    }
  }

  return (
    <div className='space-y-[12px]'>
      <div className='space-y-[8px]'>
        <button
          onClick={onClearCache}
          className='group flex w-full items-center justify-between rounded-[8px] border border-indigo-500/20 bg-slate-900/50 p-[16px] text-left transition-all hover:border-red-500/50 hover:bg-red-500/10'
        >
          <span className='text-[14px] font-black tracking-wider text-white uppercase'>
            Clear Cache and Reload
          </span>
          <div className='opacity-0 transition-opacity group-hover:opacity-100'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-[18px] w-[18px] text-red-500'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M13 7l5 5m0 0l-5 5m5-5H6'
              />
            </svg>
          </div>
        </button>

        <button
          onClick={takeScreenshot}
          className='group flex w-full items-center justify-between rounded-[8px] border border-indigo-500/20 bg-slate-900/50 p-[16px] text-left transition-all hover:border-indigo-500/50 hover:bg-indigo-500/10'
        >
          <span className='text-[14px] font-black tracking-wider text-white uppercase'>
            Take Screenshot
          </span>
          <div className='opacity-0 transition-opacity group-hover:opacity-100'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-[18px] w-[18px] text-indigo-400'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M13 7l5 5m0 0l-5 5m5-5H6'
              />
            </svg>
          </div>
        </button>

        <button className='group flex w-full items-center justify-between rounded-[8px] border border-indigo-500/20 bg-slate-900/50 p-[16px] text-left transition-all hover:border-indigo-500/50 hover:bg-indigo-500/10'>
          <span className='text-[14px] font-black tracking-wider text-white uppercase'>
            Show Debug
          </span>
          <div className='opacity-0 transition-opacity group-hover:opacity-100'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-[18px] w-[18px] text-indigo-400'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M13 7l5 5m0 0l-5 5m5-5H6'
              />
            </svg>
          </div>
        </button>

        <button
          onClick={() => window.history.back()}
          className='group flex w-full items-center justify-between rounded-[8px] border border-indigo-500/20 bg-slate-900/50 p-[16px] text-left transition-all hover:border-indigo-500/50 hover:bg-indigo-500/10'
        >
          <span className='text-[14px] font-black tracking-wider text-white uppercase'>
            Trigger Browser Back Button
          </span>
          <div className='opacity-0 transition-opacity group-hover:opacity-100'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-[18px] w-[18px] text-indigo-400'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M13 7l5 5m0 0l-5 5m5-5H6'
              />
            </svg>
          </div>
        </button>
      </div>

      <div className='my-[8px] h-[1px] w-full bg-indigo-500/10' />

      <div className='space-y-[8px]'>
        <span className='pl-[4px] text-[10px] font-bold tracking-widest text-indigo-400 uppercase'>
          Theme Selection
        </span>
        <div className='grid grid-cols-3 gap-[8px]'>
          {themesList.map((t) => (
            <button
              key={t.id}
              onClick={() => onSwitchTheme(t)}
              className={`flex flex-col items-center justify-center rounded-[8px] border p-[8px] transition-all ${
                currentThemeId === t.id
                  ? 'border-indigo-500 bg-indigo-500/20 shadow-[0_0_10px_rgba(99,102,241,0.3)]'
                  : 'border-indigo-500/20 bg-slate-900/50 hover:border-indigo-500/40 hover:bg-indigo-500/5'
              }`}
            >
              <span
                className={`text-[10px] font-black tracking-tight uppercase ${currentThemeId === t.id ? 'text-white' : 'text-slate-400'}`}
              >
                {t.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className='space-y-[8px]'>
        <span className='pl-[4px] text-[10px] font-bold tracking-widest text-indigo-400 uppercase'>
          Persona Selection
        </span>
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
              <span
                className={`text-[10px] font-black tracking-tight uppercase ${currentPersonaId === p.id ? 'text-white' : 'text-slate-400'}`}
              >
                {p.id === 'hinata'
                  ? 'Hyuga'
                  : p.id === 'hinata-android'
                    ? 'Model-B'
                    : 'Flash AG'}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
