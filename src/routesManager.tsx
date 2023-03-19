import { ReactElement } from 'react'

import { CoursePage } from './pages/coursePage/CoursePage'
import { CoursesListPage } from './pages/coursesListPage/CoursesListPage'

interface AppRoute {
  component: ReactElement
  path: string
}

interface getURLParams {
  id: string | number
}

export const RoutesManager = {
  home: {
    root: {
      pattern: '/home',
      getURL: () => '/home',
    },
  },
  courses: {
    root: {
      pattern: '/courses',
      getURL: () => '/courses',
    },
  },
  view: {
    root: {
      pattern: '/courses/view/:id/*',
      getURL: ({ id }: getURLParams) => `/courses/view/${id}`,
    },
  },
}

export const routes: AppRoute[] = [
  {
    component: <CoursesListPage />,
    path: RoutesManager.home.root.pattern,
  },
  {
    component: <CoursePage />,
    path: RoutesManager.view.root.pattern,
  },
]
