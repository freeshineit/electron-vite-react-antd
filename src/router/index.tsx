import React from "react";
import { createBrowserRouter } from "react-router-dom";

// layout
import Layout from "@/components/Layout";

// page
// import Home from '@/page/home/home'
const Home = React.lazy(async () => await import("@/pages/home"));
const Login = React.lazy(async () => await import("@/pages/login"));
const Register = React.lazy(async () => await import("@/pages/register"));

// ------------------ auth page ---------------------------
const Profile = React.lazy(async () => await import("@/pages/profile"));
// ------------------ end auth page -----------------------
// end page

export const router = createBrowserRouter(
  [
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
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
    // {
    //   path: "*",
    //   element: <Error404 />,
    // },
  ],
  {
    basename: "/",
  }
);
