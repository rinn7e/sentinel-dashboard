import React from 'react'
import { type Dispatcher } from 'tea-cup-fp'

import { articlesPage, commentsPage, homePage, usersPage } from '@/common/type/route'
import { ArticlesMemo } from '@/page/articles/component'
import { CommentsMemo } from '@/page/comments/component'
import { HomeMemo } from '@/page/home/component'
import { LoginMemo } from '@/page/login/component'
import { UsersMemo } from '@/page/users/component'

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
        <div className='p-[20px]'>
          <h1 className='text-[20px] font-bold'>Admin Dashboard</h1>
        </div>
        <nav className='mt-[20px] flex flex-col gap-[8px] px-[12px]'>
          <SidebarItem
            label='Overview'
            isActive={model.route.page._tag === 'HomePage'}
            onClick={() => dispatch({ _tag: 'Navigate', route: { page: homePage() } })}
          />
          <SidebarItem
            label='Articles'
            isActive={model.route.page._tag === 'ArticlesPage'}
            onClick={() => dispatch({ _tag: 'Navigate', route: { page: articlesPage() } })}
          />
          <SidebarItem
            label='Users'
            isActive={model.route.page._tag === 'UsersPage'}
            onClick={() => dispatch({ _tag: 'Navigate', route: { page: usersPage() } })}
          />
          <SidebarItem
            label='Comments'
            isActive={model.route.page._tag === 'CommentsPage'}
            onClick={() => dispatch({ _tag: 'Navigate', route: { page: commentsPage() } })}
          />
        </nav>
      </aside>

      {/* Main Content */}
      <main className='flex-grow p-[24px] lg:p-[40px]'>
        {renderPage(model, dispatch)}
      </main>
    </div>
  )
}

const SidebarItem: React.FC<{
  label: string
  isActive: boolean
  onClick: () => void
}> = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full rounded-[6px] px-[16px] py-[10px] text-left transition-colors ${
      isActive ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
    }`}
  >
    {label}
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
    case 'LoginPageModel':
      return (
        <LoginMemo
          model={model.pageModel.model}
          dispatch={(subMsg) => dispatch({ _tag: 'LoginPageMsg', subMsg })}
        />
      )
    case 'NotFoundPageModel':
      return <div className='flex h-full items-center justify-center text-[24px] font-bold text-slate-400'>404 Not Found</div>
  }
}
