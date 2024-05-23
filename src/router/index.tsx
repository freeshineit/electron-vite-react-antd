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
// const Home = React.lazy(async () => await import('@/pages/home'));
// const Login = React.lazy(async () => await import('@/pages/login'));
// const Register = React.lazy(async () => await import('@/pages/register'));

// ------------------ auth page ---------------------------
// const Profile = React.lazy(async () => await import('@/pages/profile'));
// ------------------ end auth page -----------------------
// end page

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
          ],
        },
        // auth router
        // {
        //   path: "/",
        //   element: <Auth />,
        //   children: [
        //     {
        //       path: "/profile",
        //       element: <Profile />,
        //     },
        //   ],
        // },
      ],
    },
    {
      path: '*',
      element: <Error404 />,
    },
  ],
  {
    basename: '/',
  },
);
