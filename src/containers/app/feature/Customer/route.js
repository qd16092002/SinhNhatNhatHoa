import React from 'react'
import AppLayout from '@src/components/Layouts/AppLayout'
import Home from './pages/Home'
import Birthday from './pages/Birthday'
import ImageWe from './pages/ImageWe'
import TimeDown from './pages/TimeDown'

export const customerRouteList = [

  {
    path: '/home',
    element: (
      <AppLayout>
        <Home />
      </AppLayout>
    )
  },
  {
    path: '/',
    element: (
      <AppLayout>
        <TimeDown />
      </AppLayout>
    )
  },
  {
    path: '/birthday',
    element: (
      <AppLayout>
        <Birthday />
      </AppLayout>
    )
  },
  {
    path: '/image',
    element: (
      <AppLayout>
        <ImageWe />
      </AppLayout>
    )
  },
  {
    path: '/timeline',
    element: (
      <AppLayout>
        <Home />
      </AppLayout>
    )
  }
];
