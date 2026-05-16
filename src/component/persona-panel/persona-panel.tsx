import React from 'react'
import { createPortal } from 'react-dom'
import { type Dispatcher } from 'tea-cup-fp'

import { type Model, type Msg } from './type'
import { PanelHeader } from './sub-component/panel-header'
import { DialogueSection } from './sub-component/dialogue-section'
import { ActionSection } from './sub-component/action-section'
import { HeroSection } from './sub-component/hero-section'
import { BrowserInfoSection } from './sub-component/browser-info-section'

/**
 * PersonaPanel: A clean terminal interface for Hinata's injected soul.
 * Refactored into sub-components for better organization.
 */

interface Props {
  model: Model
  dispatch: Dispatcher<Msg>
}

const GearIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns='http://www.w3.org/2000/svg' className={`${className} animate-[spin_10s_linear_infinite]`} fill='none' viewBox='0 0 24 24' stroke='currentColor'>
    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z' />
    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
  </svg>
)

export const PersonaPanel: React.FC<Props> = ({ model, dispatch }) => {
  const clearCacheAndReload = () => {
    localStorage.clear()
    window.location.reload()
  }

  const persona = model.currentPersona

  const panelContent = (
    <>
      {!model.isCollapse && (
        <div 
          className='fixed inset-0 z-[9998] bg-transparent'
          onClick={() => dispatch({ _tag: 'ToggleCollapse' })}
        />
      )}
      <div
        className={`fixed -bottom-[16px] -left-[16px] z-[9999] ${
          model.isCollapse ? 'h-[48px] w-[48px]' : 'w-[480px]'
        }`}
      >
        {model.isCollapse ? (
          <button
            type='button'
            onClick={() => dispatch({ _tag: 'ToggleCollapse' })}
            className='flex h-[48px] w-[48px] items-start justify-end pr-[8px] pt-[8px] rounded-full bg-black text-indigo-400 shadow-xl border border-indigo-500/30'
          >
            <GearIcon className='h-[20px] w-[20px] animate-[spin_10s_linear_infinite]' />
          </button>
        ) : (
          <div className='relative mb-[24px] ml-[24px] min-h-[600px] overflow-hidden rounded-[16px] border border-indigo-500/30 bg-black shadow-2xl'>
            <HeroSection portraitUrl={persona.portraitUrl} />
            
            <div className='relative z-10 flex flex-col h-full'>
              {/* Clear space for the face */}
              <div className='h-[320px] w-full' />

              {/* Blurred content area */}
              <div className='flex-1 p-[24px] backdrop-blur-md bg-black/40 border-t border-indigo-500/20'>
                <PanelHeader 
                  name={persona.name} 
                  onToggleDetails={() => dispatch({ _tag: 'ToggleDetails' })} 
                  onToggleCollapse={() => dispatch({ _tag: 'ToggleCollapse' })} 
                />

                <DialogueSection 
                  showDetails={model.showDetails} 
                  bio={persona.bio} 
                  dialogue={persona.dialogue}
                  onToggleDetails={() => dispatch({ _tag: 'ToggleDetails' })} 
                />

                {!model.showDetails && (
                  <div className='mt-[24px] space-y-[24px]'>
                    <BrowserInfoSection />
                    <ActionSection 
                      currentPersonaId={persona.id}
                      onClearCache={clearCacheAndReload} 
                      onSwitchPersona={(p) => dispatch({ _tag: 'SwitchPersona', persona: p })}
                    />
                  </div>
                )}
              </div>
              
              <div className='h-[6px] w-full bg-indigo-500/40 backdrop-blur-md' />
            </div>
          </div>
        )}
      </div>
    </>
  )

  return createPortal(panelContent, document.body)
}
