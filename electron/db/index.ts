/* eslint-disable @typescript-eslint/promise-function-async */
import sqlite3 from 'sqlite3';
import path from 'path';
import fse from 'fs-extra';
// import { app } from 'electron';
import { ENV_CONFIG } from '../env_config';

/**
 * @description 数据库操作 (VSCode 可以安装对应的插件访问数据库)
 */
class Database {
  private static _instance: sqlite3.Database;

  public static getInstance() {
    if (Database._instance) {
      return Database._instance;
    }

    const DB_PATH = path.resolve(process.cwd(), `./config/${ENV_CONFIG.DBConfig.path}`);

    if (!fse.existsSync(DB_PATH)) {
      fse.ensureFileSync(DB_PATH);
    }

    console.log('DB_PATH', DB_PATH);

    Database._instance = new sqlite3.Database(DB_PATH, (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Connected to the database.');
    });
  }

  constructor() {
    Database.getInstance();
  }

  open() {
    return new Promise<void>((resolve) => {
      Database._instance.serialize(() => {
        Database._instance.run('PRAGMA foreign_keys = ON');
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
      Database._instance?.run(sql,
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
    Database._instance?.close((err) => {
      if (err) {
        //
        console.error('DB clone error: ', err.message);
      }
    });
  }
}

export default Database;
