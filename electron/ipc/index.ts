import { type BrowserWindow, ipcMain } from 'electron';
import type Sql from '../sql';

const TAG = '[Main IPC]';

/**
 * 注册main Ipc
 */
class IPC {
  constructor(win: BrowserWindow, db: Sql) {
    this._init();
  }

  private _init() {
    ipcMain.on('get-data', (event, arg) => {
      //   event.returnValue = 'pong';
    });
  }
}

export default IPC;
