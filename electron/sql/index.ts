import Database from 'better-sqlite3';
import path from 'path';
import fse from 'fs-extra';
import { ENV_CONFIG } from '../env_config';

const TAG = '[sqlite3]';

class Sql {
  private static _instance: Sql;
  db;

  public static getInstance() {
    return (this._instance ??= new Sql());
  }

  constructor() {
    const DB_PATH = path.resolve(process.cwd(), `./config/${ENV_CONFIG.DBConfig.path}`);
    if (!fse.existsSync(DB_PATH)) {
      fse.ensureFileSync(DB_PATH);
    }

    console.log(TAG, 'DB_PATH', DB_PATH);
    this.db = new Database(DB_PATH, {});
    this.db.pragma('journal_mode = WAL');
  }
}

export default Sql;
