/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { app, BrowserWindow, shell, ipcMain, crashReporter, Menu, session } from 'electron';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
// import installExtension, { REDUX_DEVTOOLS } from 'electron-devtools-installer';
import path from 'path';
import os from 'os';
import { update } from './update';
import Sql from '../sql';
import IPC from '../ipc';
import { ENV_CONFIG } from '../env_config';
import logger from '../logger';
import { isDevelopment, isDarwin } from '../utils';

// 下面两行有用 不要删除
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const require = createRequire(import.meta.url);
// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron-Main
// │ └─┬ preload
// │   └── index.mjs   > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//
process.env.APP_ROOT = path.join(__dirname, '../..');

export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron');
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist');
export const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL;

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST;

// Disable GPU Acceleration for Windows 7
if (os.release().startsWith('6.1')) app.disableHardwareAcceleration();

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

let win: BrowserWindow | null = null;
let sql: Sql;
let ipc: IPC;
const preload = path.join(__dirname, '../preload/index.js');
const indexHtml = path.join(RENDERER_DIST, 'index.html');

// 崩溃提交日志
crashReporter.start(ENV_CONFIG.crashReporterConfig);

process.on('uncaughtException', (err) => {
  // 监控崩溃
  logger.error(err);
});

async function createWindow() {
  win = new BrowserWindow({
    title: 'Main window',
    icon: path.join(process.env.VITE_PUBLIC, 'favicon.ico'),
    frame: false,
    titleBarStyle: undefined,
    useContentSize: true,
    autoHideMenuBar: true,
    minHeight: 400,
    minWidth: 600,
    webPreferences: {
      preload,
      // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
      // nodeIntegration: true,

      // Consider using contextBridge.exposeInMainWorld
      // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
      // contextIsolation: false,
    },
  });

  if (VITE_DEV_SERVER_URL) {
    // #298
    win.loadURL(VITE_DEV_SERVER_URL);
    if (isDevelopment) {
      // Open devTool if the app is not packaged
      win.webContents.openDevTools();
    }
  } else {
    win.loadFile(indexHtml);
  }

  // Test actively push message to the Electron-Renderer
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString());
  });

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url);
    return { action: 'deny' };
  });

  // Auto update
  update(win);
}

/**
 * @description 安装Chrome扩展
 * @returns
 */
const installExtensions = async () => {
  const reactDevtoolsPath = path.join(__dirname, '../../chrome_plugins/redux-devtools');
  await session.defaultSession.loadExtension(reactDevtoolsPath, { allowFileAccess: true });
};

app.whenReady().then(async () => {
  if (isDarwin) {
    Menu.setApplicationMenu(Menu.buildFromTemplate([]));
  } else {
    Menu.setApplicationMenu(null);
  }

  // hide menu for Mac
  // if (isDarwin) {
  //   app.dock.hide();
  // }

  await createWindow();
  logger.log('isDevelopment', isDevelopment);
  // 安装浏览器插件 （mac 上出错了, 请求不到插件）
  if (isDevelopment) await installExtensions();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, prefer-const
  sql = Sql.getInstance();
  if (win) ipc = new IPC(win, sql);
});

// 确保在应用退出时关闭数据库连接
app.on('before-quit', () => {
  sql?.db?.close();
});

app.on('window-all-closed', () => {
  win = null;
  if (isDarwin) {
    app.quit();
  }

  if (sql?.db) {
    sql.db.close();
  }
  sql = null!;
});

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});

// New window example arg: new windows url
ipcMain.handle('open-win', (_, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${VITE_DEV_SERVER_URL}#${arg}`);
  } else {
    childWindow.loadFile(indexHtml, { hash: arg });
  }
});
