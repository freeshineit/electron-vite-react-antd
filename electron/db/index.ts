/* eslint-disable @typescript-eslint/promise-function-async */
import sqlite3 from 'sqlite3';
import path from 'path';
// import { app } from 'electron';
import { ENV_CONFIG } from '../env_config';

const DB_PATH = path.resolve(process.cwd(), `./config/${ENV_CONFIG.DBConfig.path}`);

/**
 * @description 数据库操作 (VSCode 可以安装对应的插件访问数据库)
 *
 */
class Database {
  private _db!: sqlite3.Database;

  constructor() {
    console.log('DB_PATH', DB_PATH);

    this.connect();
  }

  connect() {
    if (this._db) {
      return null;
    }
    this._db = new sqlite3.Database(DB_PATH, (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Connected to the database.');
    });
  }

  open() {
    return new Promise<void>((resolve) => {
      this._db.serialize(() => {
        this._db.run('PRAGMA foreign_keys = ON');
        console.log('Connected to the database.');
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
      this._db?.run(sql,
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
    this._db?.close((err) => {
      if (err) {
        //
        console.error('DB clone error: ', err.message);
      }
    });
  }
}

export default Database;
