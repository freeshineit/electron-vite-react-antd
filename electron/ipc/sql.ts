import { ipcMain } from 'electron';
import type BetterSqlite3 from 'better-sqlite3';
import IPC_CONST from '../../constant/ipc';
import logger from '../logger';
import Person, { type IPerson } from '../sql/person';

const TAG = '[SQL IPC] ';

function ipcSql(db: BetterSqlite3.Database) {
  const person = new Person(db);
  logger.log(TAG, 'init');
  ipcMain.handle(IPC_CONST.DB_PERSON_INSERT, async (event, arg) => {
    logger.log(TAG, IPC_CONST.DB_PERSON_INSERT);
    person.insert(arg as IPerson);
  });

  ipcMain.handle(IPC_CONST.DB_PERSON_INSERT_LIST, async () => {});

  ipcMain.handle(IPC_CONST.DB_PERSON_UPDATE, async () => {});

  ipcMain.handle(IPC_CONST.DB_PERSON_DELETE_BY_ID, async () => {});

  ipcMain.handle(IPC_CONST.DB_PERSON_QUERY_BY_ID, async () => {});

  ipcMain.handle(IPC_CONST.DB_PERSON_QUERY_ALL, async () => {});
}

export default ipcSql;
