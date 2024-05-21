import { type BrowserWindow, ipcMain } from 'electron';
import type Sql from '../sql';
import IPC_CONST from '../../constant/ipc';

const TAG = '[Main IPC]';

/**
 * 注册main Ipc
 */
class IPC {
  private readonly _win;
  private readonly _db;

  constructor(win: BrowserWindow, db: Sql) {
    this._win = win;
    this._db = db;
    this._init();
    this._window();
  }

  private _init() {
    ipcMain.on('get-data', (event, arg) => {
      //   event.returnValue = 'pong';
    });
  }

  private _window() {
    console.log(TAG, 'window');
    //
    ipcMain.handle(IPC_CONST.WINDOW_MIN, async () => {
      this._win.minimize();
    });

    ipcMain.handle(IPC_CONST.WINDOW_FULL_SCREEN, async () => {
      console.log(TAG, 'window fullScreen', this._win.fullScreen);
      this._win.setFullScreen(!this._win.fullScreen);

      // if (this._win.isMaximized()) {
      //   // this._win.fullScreen()
      //   // this._win.unmaximize();
      // } else {
      //   this._win.maximize();
      // }
    });

    ipcMain.handle(IPC_CONST.WINDOW_CLOSE, async () => {
      this._win.close();
    });
  }
}

export default IPC;
