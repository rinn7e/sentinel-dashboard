import React from 'react'
import { type Dispatcher } from 'tea-cup-fp'

import { themes } from '@/theme/data'
import { type Theme } from '@/theme/type'
import { type ColorScheme } from '@/theme/util'
import { type Msg } from '@/type'

const SunIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='h-[20px] w-[20px]'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
  >
    <circle
      cx='12'
      cy='12'
      r='4'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      d='M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41'
    />
  </svg>
)

const MoonIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='h-[20px] w-[20px]'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      d='M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z'
    />
  </svg>
)

const MonitorIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='h-[20px] w-[20px]'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
  >
    <rect
      x='2'
      y='3'
      width='20'
      height='14'
      rx='2'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      d='M8 21h8M12 17v4'
    />
  </svg>
)

type SchemeOption = {
  value: ColorScheme
  label: string
  description: string
  icon: React.ReactNode
}

const schemeOptions: SchemeOption[] = [
  {
    value: 'light',
    label: 'Light',
    description: 'Always use light interface',
    icon: <SunIcon />,
  },
  {
    value: 'dark',
    label: 'Dark',
    description: 'Always use dark interface',
    icon: <MoonIcon />,
  },
  {
    value: 'auto',
    label: 'Auto',
    description: 'Follow your OS setting',
    icon: <MonitorIcon />,
  },
]

export const SettingsComponent: React.FC<{
  colorScheme: ColorScheme
  theme: Theme
  dispatch: Dispatcher<Msg>
}> = ({ colorScheme, theme, dispatch }) => {
  const themesList = Object.values(themes)

  return (
    <div className='flex flex-col gap-[40px]'>
      <div>
        <h2 className='text-theme-secondary text-[28px] font-bold dark:text-white'>
          Settings
        </h2>
        <p className='mt-[4px] text-slate-500 dark:text-slate-200'>
          Manage your appearance preferences.
        </p>
      </div>

      {/* Appearance Section */}
      <section>
        <div className='mb-[20px]'>
          <h3 className='text-theme-secondary text-[18px] font-bold dark:text-white'>
            Appearance
          </h3>
          <p className='mt-[4px] text-[14px] text-slate-500 dark:text-slate-200'>
            Choose how the admin panel looks. Your preference is saved locally.
          </p>
        </div>

        <div className='grid grid-cols-1 gap-[16px] sm:grid-cols-3'>
          {schemeOptions.map((opt) => {
            const isActive = colorScheme === opt.value
            return (
              <button
                key={opt.value}
                id={`color-scheme-${opt.value}`}
                onClick={() =>
                  dispatch({ _tag: 'SetColorScheme', scheme: opt.value })
                }
                className={`group flex flex-col items-start gap-[12px] rounded-[16px] border p-[24px] text-left transition-all duration-200 ${
                  isActive
                    ? 'border-theme-primary bg-theme-primary/10 shadow-theme-primary/10 shadow-lg'
                    : 'dark:bg-surface-dark hover:border-theme-primary/40 hover:bg-theme-primary/5 border-slate-200 bg-white dark:border-white/20'
                }`}
              >
                <div
                  className={`flex h-[44px] w-[44px] items-center justify-center rounded-[12px] transition-colors ${
                    isActive
                      ? 'bg-theme-primary text-white'
                      : 'group-hover:bg-theme-primary/10 group-hover:text-theme-primary bg-slate-100 text-slate-500 dark:bg-white/10 dark:text-slate-200'
                  }`}
                >
                  {opt.icon}
                </div>
                <div>
                  <div
                    className={`text-[16px] font-bold ${
                      isActive
                        ? 'text-theme-primary'
                        : 'text-theme-secondary dark:text-white'
                    }`}
                  >
                    {opt.label}
                  </div>
                  <div className='mt-[2px] text-[13px] text-slate-500 dark:text-slate-200'>
                    {opt.description}
                  </div>
                </div>
                {isActive && (
                  <div className='mt-auto ml-auto'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='text-theme-primary h-[20px] w-[20px]'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </section>

      {/* Theme Section */}
      <section>
        <div className='mb-[20px]'>
          <h3 className='text-theme-secondary text-[18px] font-bold dark:text-white'>
            Color Theme
          </h3>
          <p className='mt-[4px] text-[14px] text-slate-500 dark:text-slate-200'>
            Pick an accent color for the interface. Affects primary and
            secondary colors.
          </p>
        </div>

        <div className='grid grid-cols-1 gap-[16px] sm:grid-cols-3'>
          {themesList.map((t) => {
            const isActive = theme.id === t.id
            return (
              <button
                key={t.id}
                id={`theme-${t.id}`}
                onClick={() => dispatch({ _tag: 'SwitchTheme', theme: t })}
                className={`group flex flex-col gap-[16px] rounded-[16px] border p-[20px] text-left transition-all duration-200 ${
                  isActive
                    ? 'border-theme-primary bg-theme-primary/10 shadow-theme-primary/10 shadow-lg'
                    : 'dark:bg-surface-dark hover:border-theme-primary/40 hover:bg-theme-primary/5 border-slate-200 bg-white dark:border-white/20'
                }`}
              >
                {/* 2x2 swatch grid: light row + dark row */}
                <div className='flex flex-col gap-[6px]'>
                  {/* Light mode */}
                  <div className='flex items-center gap-[6px]'>
                    <span className='w-[32px] text-[9px] font-bold tracking-wider text-slate-400 uppercase dark:text-slate-200'>
                      Light
                    </span>
                    <div
                      className='h-[20px] w-[20px] rounded-[6px] shadow-sm ring-1 ring-black/10'
                      style={{ backgroundColor: t.primaryColor }}
                      title={`Primary: ${t.primaryColor}`}
                    />
                    <div
                      className='h-[20px] w-[20px] rounded-[6px] shadow-sm ring-1 ring-black/10'
                      style={{ backgroundColor: t.secondaryColor }}
                      title={`Secondary: ${t.secondaryColor}`}
                    />
                  </div>
                  {/* Dark mode */}
                  <div className='flex items-center gap-[6px]'>
                    <span className='w-[32px] text-[9px] font-bold tracking-wider text-slate-400 uppercase dark:text-slate-200'>
                      Dark
                    </span>
                    <div
                      className='h-[20px] w-[20px] rounded-[6px] shadow-sm ring-1 ring-black/10'
                      style={{ backgroundColor: t.primaryColorDarkMode }}
                      title={`Primary dark: ${t.primaryColorDarkMode}`}
                    />
                    <div
                      className='h-[20px] w-[20px] rounded-[6px] shadow-sm ring-1 ring-black/10'
                      style={{ backgroundColor: t.secondaryColorDarkMode }}
                      title={`Secondary dark: ${t.secondaryColorDarkMode}`}
                    />
                  </div>
                </div>

                <div className='flex flex-1 items-center justify-between'>
                  <div>
                    <div
                      className={`text-[15px] font-bold ${isActive ? 'text-theme-primary' : 'text-theme-secondary dark:text-white'}`}
                    >
                      {t.name}
                    </div>
                    <div className='mt-[2px] font-mono text-[11px] text-slate-400 dark:text-slate-200'>
                      {t.primaryColor} · {t.primaryColorDarkMode}
                    </div>
                  </div>
                  {isActive && (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='text-theme-primary h-[20px] w-[20px] shrink-0'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                        clipRule='evenodd'
                      />
                    </svg>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </section>
    </div>
  )
}
