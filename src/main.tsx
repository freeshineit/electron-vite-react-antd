import './demos/ipc';
// If you want use Node.js, the`nodeIntegration` needs to be enabled in the Main process.
// import "./demos/node";

import React from 'react';
import ReactDOM from 'react-dom/client';
// import { ConfigProvider } from "antd";
import { RouterProvider } from 'react-router-dom';
// import { Provider } from "react-redux";
// import ErrorBoundary from "@/components/ErrorBoundary";
import Loading from '@/components/common/Loading';
// import { store } from "./store";
import { router } from './router';
import './styles/common.scss';

/** global logger */
// window.logger = logger;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <React.Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </React.Suspense>
  </React.StrictMode>,
);

postMessage({ payload: 'removeLoading' }, '*');
