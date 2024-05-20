import './demos/ipc';
// If you want use Node.js, the`nodeIntegration` needs to be enabled in the Main process.
// import "./demos/node";

import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
// import ErrorBoundary from "@/components/ErrorBoundary";
import Loading from '@/components/common/Loading';
import { store } from './redux';
import { router } from './router';
import './styles/common.scss';

/** global logger */
// window.logger = logger;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider
      // theme={{
      //   token: $__THEME__$, // vite global antd5 theme
      // }}
      >
        <React.Suspense fallback={<Loading />}>
          <RouterProvider router={router} />
        </React.Suspense>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>,
);

postMessage({ payload: 'removeLoading' }, '*');
