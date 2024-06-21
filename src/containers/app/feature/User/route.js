import HeaderOnlyLayout from '@src/components/Layouts/HeaderOnlyLayout'
import ProfileLayout from '@src/components/Layouts/ProfileLayout'
import Overview from './pages/Overview'
// import Settings from './pages/Settings'
import Submission from './pages/Submission'
import SubmissionHistory from './pages/SubmissionHistory'
import Teams from './pages/Teams'
import { Outlet } from 'react-router'
import DetailModel from './pages/DetailModel'
import ProfileLayout2 from '@src/components/Layouts/ProfileLayout2'
import OverviewUser from './pages/OverviewUser'
// import Overview3 from './pages/Overview/index2'
import Data from './pages/Data'
import AppLayout from '@src/components/Layouts/AppLayout'
import EmailVerificationPage from './pages/Verified'

import Settings from './pages/Settings/Settings'
import RequireAuth from '@src/routes/RequireAuth'

export const userRouteList = [
  {
    path: '/overview',
    element: (
      <ProfileLayout>
        <Overview />
      </ProfileLayout>
    )
  },

  {
    path: '/overview/user',
    element: (
      <ProfileLayout2>
        <OverviewUser />
      </ProfileLayout2>
    )
  },
  {
    path: '/teams/user',
    element: (
      <ProfileLayout2>
        <Teams />
      </ProfileLayout2>
    )
  },
  {
    path: '/teams',
    element: (
      <ProfileLayout>
        <Teams />
      </ProfileLayout>
    )
  },
  {
    path: '/settings',
    element: (
      <ProfileLayout>
        <Settings />
      </ProfileLayout>
    )
  },
  {
    path: '/submission',
    element: (
      <HeaderOnlyLayout>
        <RequireAuth>
          <Outlet />
        </RequireAuth>
      </HeaderOnlyLayout>
    ),
    children: [
      { path: '', element: <Submission /> },
      { path: ':id', element: <SubmissionHistory /> }
    ]
  },
  {
    path: '/model',
    element: (
      <HeaderOnlyLayout>
        <RequireAuth>
          <Outlet />
        </RequireAuth>
      </HeaderOnlyLayout>
    ),
    children: [{ path: '', element: <DetailModel /> }]
  },
  {
    path: '/data',
    element: (
      <AppLayout>
        <Data />
      </AppLayout>
    )
  },
  {
    path: '/verified',
    element: (
      <HeaderOnlyLayout>
        <EmailVerificationPage />
      </HeaderOnlyLayout>
    )
  }
]
