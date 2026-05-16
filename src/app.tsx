import React from 'react'
import { type Dispatcher } from 'tea-cup-fp'

import { articlesPage, commentsPage, homePage, usersPage, visitorsPage } from '@/common/type/route'
import { ArticlesMemo } from '@/page/articles/component'
import { CommentsMemo } from '@/page/comments/component'
import { HomeMemo } from '@/page/home/component'
import { LoginMemo } from '@/page/login/component'
import { UsersMemo } from '@/page/users/component'
import { VisitorsMemo } from '@/page/visitors/component'

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
            icon='📊'
            active={model.route.page._tag === 'HomePage'}
            onClick={() => dispatch({ _tag: 'Navigate', route: { page: homePage() } })}
          />
          <SidebarLink
            label='Articles'
            icon='📄'
            active={model.route.page._tag === 'ArticlesPage'}
            onClick={() => dispatch({ _tag: 'Navigate', route: { page: articlesPage() } })}
          />
          <SidebarLink
            label='Users'
            icon='👤'
            active={model.route.page._tag === 'UsersPage'}
            onClick={() => dispatch({ _tag: 'Navigate', route: { page: usersPage() } })}
          />
          <SidebarLink
            label='Comments'
            icon='💬'
            active={model.route.page._tag === 'CommentsPage'}
            onClick={() => dispatch({ _tag: 'Navigate', route: { page: commentsPage() } })}
          />
          <SidebarLink
            label='Visitors'
            icon='👥'
            active={model.route.page._tag === 'VisitorsPage'}
            onClick={() => dispatch({ _tag: 'Navigate', route: { page: visitorsPage() } })}
          />
        </nav>
      </aside>

      {/* Main Content */}
      <main className='flex-grow overflow-y-auto p-[24px] lg:p-[40px]'>
        {renderPage(model, dispatch)}
      </main>
    </div>
  )
}

const SidebarLink: React.FC<{
  label: string
  icon: string
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
    <span className='text-[18px]'>{icon}</span>
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
