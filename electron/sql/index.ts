import { app } from 'electron';
import Database from 'better-sqlite3';
import path from 'path';
import fse from 'fs-extra';
import { ENV_CONFIG } from '../env_config';
import logger from '../logger';
import { isDevelopment } from '../utils';

const TAG = '[sqlite3]';

class Sql {
  private static _instance: Sql;
  db;

  public static getInstance() {
    return (this._instance ??= new Sql());
  }

  constructor() {
    // 获取应用数据目录的路径
    const userDataPath = app.getPath('userData');
    // 创建数据库文件的完整路径
    let DB_PATH = path.join(userDataPath, ENV_CONFIG.DBConfig.fileName);

    if (isDevelopment) {
      DB_PATH = path.resolve(process.cwd(), `./config/data/${ENV_CONFIG.DBConfig.fileName}`);
      if (!fse.existsSync(DB_PATH)) {
        fse.ensureFileSync(DB_PATH);
      }
    }

    logger.log(TAG, 'DB_PATH', DB_PATH);
    this.db = new Database(DB_PATH, {});
    this.db.pragma('journal_mode = WAL');
  }
}

export default Sql;
