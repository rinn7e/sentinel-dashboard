import React from 'react'
import { type Dispatcher } from 'tea-cup-fp'

import { articlesPage, commentsPage, homePage, usersPage, visitorsPage } from '@/common/type/route'
import { ArticlesMemo } from '@/page/articles/component'
import { CommentsMemo } from '@/page/comments/component'
import { HomeMemo } from '@/page/home/component'
import { LoginMemo } from '@/page/login/component'
import { UsersMemo } from '@/page/users/component'
import { VisitorsMemo } from '@/page/visitors/component'
import { PersonaPanel } from '@/component/persona-panel/persona-panel'

import { type Model, type Msg } from './type'

interface Props {
  model: Model
  dispatch: Dispatcher<Msg>
}

// TODO: Implement mobile-first sidebar toggle for better responsiveness
export const App: React.FC<Props> = ({ model, dispatch }) => {
  // If we are on the login page, show a different layout (no sidebar)
  if (model.route.page._tag === 'LoginPage') {
    return (
      <main className='h-dvh bg-gray-50'>
        {renderPage(model, dispatch)}
        <PersonaPanel 
          model={model.persona} 
          dispatch={(subMsg) => dispatch({ _tag: 'PersonaMsg', subMsg })} 
        />
      </main>
    )
  }

  return (
    <div className='flex min-h-dvh flex-col bg-gray-50 lg:flex-row'>
      {/* Sidebar */}
      <aside className='w-full bg-slate-900 text-white lg:w-[260px] lg:shrink-0'>
        <div className='p-[24px]'>
          <h1 className='text-[22px] font-bold tracking-tight'>Admin Panel</h1>
          <p className='text-[12px] text-slate-400'>RealWorld Dashboard</p>
        </div>
        <nav className='mt-[20px] flex flex-col gap-[4px] px-[12px]'>
          <SidebarLink
            label='Overview'
            icon={
              <svg xmlns='http://www.w3.org/2000/svg' className='h-[20px] w-[20px]' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' />
              </svg>
            }
            active={model.route.page._tag === 'HomePage'}
            onClick={() => dispatch({ _tag: 'Navigate', route: { page: homePage() } })}
          />
          <SidebarLink
            label='Articles'
            icon={
              <svg xmlns='http://www.w3.org/2000/svg' className='h-[20px] w-[20px]' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v12a2 2 0 01-2 2z' />
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M14 2v6h6' />
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M7 11h10M7 15h10' />
              </svg>
            }
            active={model.route.page._tag === 'ArticlesPage'}
            onClick={() => dispatch({ _tag: 'Navigate', route: { page: articlesPage() } })}
          />
          <SidebarLink
            label='Users'
            icon={
              <svg xmlns='http://www.w3.org/2000/svg' className='h-[20px] w-[20px]' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' />
              </svg>
            }
            active={model.route.page._tag === 'UsersPage'}
            onClick={() => dispatch({ _tag: 'Navigate', route: { page: usersPage() } })}
          />
          <SidebarLink
            label='Comments'
            icon={
              <svg xmlns='http://www.w3.org/2000/svg' className='h-[20px] w-[20px]' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' />
              </svg>
            }
            active={model.route.page._tag === 'CommentsPage'}
            onClick={() => dispatch({ _tag: 'Navigate', route: { page: commentsPage() } })}
          />
          <SidebarLink
            label='Visitors'
            icon={
              <svg xmlns='http://www.w3.org/2000/svg' className='h-[20px] w-[20px]' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' />
              </svg>
            }
            active={model.route.page._tag === 'VisitorsPage'}
            onClick={() => dispatch({ _tag: 'Navigate', route: { page: visitorsPage() } })}
          />
        </nav>
      </aside>

      {/* Main Content */}
      <main className='flex-grow overflow-y-auto p-[24px] lg:p-[40px]'>
        {renderPage(model, dispatch)}
      </main>

      <PersonaPanel 
        model={model.persona} 
        dispatch={(subMsg) => dispatch({ _tag: 'PersonaMsg', subMsg })} 
      />
    </div>
  )
}

const SidebarLink: React.FC<{
  label: string
  icon: React.ReactNode
  active: boolean
  onClick: () => void
}> = ({ label, icon, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex w-full items-center gap-[12px] rounded-[8px] px-[16px] py-[12px] text-left transition-all duration-200 ${
      active
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
    }`}
  >
    <span className='shrink-0'>{icon}</span>
    <span className='font-medium'>{label}</span>
  </button>
)

const renderPage = (model: Model, dispatch: Dispatcher<Msg>) => {
  switch (model.pageModel._tag) {
    case 'HomePageModel':
      return (
        <HomeMemo
          model={model.pageModel.model}
          dispatch={(subMsg) => dispatch({ _tag: 'HomePageMsg', subMsg })}
        />
      )
    case 'ArticlesPageModel':
      return (
        <ArticlesMemo
          model={model.pageModel.model}
          dispatch={(subMsg) => dispatch({ _tag: 'ArticlesPageMsg', subMsg })}
        />
      )
    case 'UsersPageModel':
      return (
        <UsersMemo
          model={model.pageModel.model}
          dispatch={(subMsg) => dispatch({ _tag: 'UsersPageMsg', subMsg })}
        />
      )
    case 'CommentsPageModel':
      return (
        <CommentsMemo
          model={model.pageModel.model}
          dispatch={(subMsg) => dispatch({ _tag: 'CommentsPageMsg', subMsg })}
        />
      )
    case 'VisitorsPageModel':
      return (
        <VisitorsMemo
          model={model.pageModel.model}
          dispatch={(subMsg) => dispatch({ _tag: 'VisitorsPageMsg', subMsg })}
        />
      )
    case 'LoginPageModel':
      return (
        <LoginMemo
          model={model.pageModel.model}
          dispatch={(subMsg) => dispatch({ _tag: 'LoginPageMsg', subMsg })}
        />
      )
    case 'NotFoundPageModel':
      return (
        <div className='flex h-full items-center justify-center text-[24px] font-bold text-slate-400'>
          404 Not Found
        </div>
      )
  }
}
