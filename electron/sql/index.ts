/* eslint-disable @typescript-eslint/promise-function-async */
import { app } from 'electron';
import sqlite3 from 'sqlite3';
import path from 'path';
import fse from 'fs-extra';
import { ENV_CONFIG } from '../env_config';

const TAG = '[sqlite3]';
/**
 * @description 数据库操作 (VSCode 可以安装对应的插件访问数据库)
 */
class Sql {
  private static _instance: Sql;
  db: sqlite3.Database;

  public static getInstance() {
    return (this._instance ??= new Sql());
  }

  constructor() {
    const DB_PATH = path.resolve(process.cwd(), `./config/${ENV_CONFIG.DBConfig.path}`);
    console.log(TAG, 'userData', app.getPath('userData'));
    if (!fse.existsSync(DB_PATH)) {
      fse.ensureFileSync(DB_PATH);
    }
    console.log(TAG, 'DB_PATH', DB_PATH);

    this.db = new sqlite3.Database(DB_PATH, (err) => {
      if (err) {
        console.error(TAG, err.message);
      }
      console.log(TAG, 'Connected to the database.');
    });
  }

  open() {
    return new Promise<void>((resolve) => {
      this.db.serialize(() => {
        this.db.run('PRAGMA foreign_keys = ON');
        console.log(TAG, 'Connected to the database.');
        resolve();
      });
    });
  }

  /**
   * @description 创建表格
   * @param sql
   * @param callback
   */
  // prettier-ignore
  createTable(sql: string) {
    return new Promise((resolve, reject) => {
      this.db?.run(sql,
        (err: Error | null) => {
          if (err) {
            reject(err);
          }
          resolve(true);
        },
      );
    });
  }

  close() {
    this.db?.close((err) => {
      if (err) {
        //
        console.error(TAG, 'DB clone error: ', err.message);
      }
    });
  }
}

export default Sql;
