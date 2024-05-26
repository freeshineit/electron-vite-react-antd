import { type BrowserWindow, ipcMain } from 'electron';
import type BetterSqlite3 from 'better-sqlite3';
import logger from '../logger';
import IPC_CONST from '../../constant/ipc';
import ipcSql from './sql';

const TAG = '[Main IPC]';

/**
 * 注册main Ipc
 */
class IPC {
  private readonly _win;
  private readonly _db;

  constructor(win: BrowserWindow, db: BetterSqlite3.Database) {
    this._win = win;
    this._db = db;
    this._init();
    this._window();
    this._sql();
  }

  private _init() {
    ipcMain.on('get-data', (event, arg) => {});
  }

  private _window() {
    logger.log(TAG, 'window');

    //
    ipcMain.handle(IPC_CONST.WINDOW_MIN, async () => {
      this._win.minimize();
    });

    ipcMain.handle(IPC_CONST.WINDOW_FULL_SCREEN, async () => {
      logger.log(TAG, 'window fullScreen', this._win.fullScreen);
      this._win.setFullScreen(!this._win.fullScreen);
    });

    ipcMain.handle(IPC_CONST.WINDOW_CLOSE, async () => {
      // if (isDarwin) {
      //   this._win.hide();
      // } else {
      logger.log(TAG, 'window close');
      this._win.close();
      // }
    });

    //
    ipcMain.handle(IPC_CONST.WINDOW_MAXIMIZE, () => {
      if (this._win.isMaximized()) {
        this._win.unmaximize();
      } else {
        this._win.maximize();
      }
    });
  }

  private _sql() {
    ipcSql(this._db);
  }
}

export default IPC;
