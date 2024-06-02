import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
// layout
import Layout from '@/components/Layout';
import Auth from '@/components/Auth';
import Error404 from '@/pages/error/404';

// page
import Home from '@/pages/home';
import Login from '@/pages/login';
import Register from '@/pages/register';
import Profile from '@/pages/profile';

// ------------------ auth page ---------------------------
// ------------------ end auth page -----------------------
// end page

const Error404Router = {
  path: '*',
  element: <Error404 />,
};

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/register',
          element: <Register />,
        },
        {
          path: '/',
          element: <Auth />,
          children: [
            {
              index: true,
              element: <Home />,
            },
            {
              path: '/profile',
              element: <Profile />,
            },
            Error404Router,
          ],
        },
        Error404Router,
      ],
    },
  ],
  {
    basename: '/',
  },
);
