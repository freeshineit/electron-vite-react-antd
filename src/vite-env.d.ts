/* eslint-disable @typescript-eslint/consistent-type-imports */
/// <reference types="vite/client" />
/// <reference types="./type/electron-updater.d.ts" />

interface Window {
  // expose in the `electron/preload/index.ts`
  ipcRenderer: import('electron').IpcRenderer;
}
