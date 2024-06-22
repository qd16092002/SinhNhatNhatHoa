import React from 'react'
import AppLayout from '@src/components/Layouts/AppLayout'
import Home from './pages/Home'
import Birthday from './pages/Birthday'
import ImageWe from './pages/ImageWe'
import TimeDown from './pages/TimeDown'

// Thời gian đích: 0h ngày 23/6
const targetDate = new Date('2024-06-23T00:00:00');

// Thời gian hiện tại
const currentDate = new Date();

// Kiểm tra xem thời gian hiện tại đã đạt đến thời gian đích chưa
const isBeforeTargetDate = currentDate < targetDate;

export const customerRouteList = isBeforeTargetDate ? [
  {
    path: '/',
    element: (
      <AppLayout>
        <TimeDown />
      </AppLayout>
    )
  }
] : [
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
