/* eslint-disable @typescript-eslint/prefer-promise-reject-errors */
/* eslint-disable @typescript-eslint/promise-function-async */
import type BetterSqlite3 from 'better-sqlite3';
import logger from '../logger';

const TAG = '[persons table] ';

export interface IPerson {
  id?: string;
  name: string;
  age: string;
}

class Person {
  private readonly _db: BetterSqlite3.Database;
  constructor(db: BetterSqlite3.Database) {
    this._db = db;
    this.createTable();
  }

  createTable() {
    logger.log(TAG, 'create persons table');
    try {
      this._db.exec(`
      CREATE TABLE IF NOT EXISTS persons(
       id  INTEGER PRIMARY KEY AUTOINCREMENT,
       name  CHAR(50) NOT NULL,
       age   INT
   )`);
    } catch (error) {
      logger.error(TAG, error);
    }
  }

  insert(person: IPerson) {
    return new Promise((resolve, reject) => {
      try {
        const result = this._db.prepare('INSERT INTO persons (name, age) VALUES (@name, @age)').run(person);
        resolve(result);
      } catch (error) {
        logger.error(TAG, error);
        reject(error);
      }
    });
  }

  insertList(persons: IPerson[]) {
    const insertQuery = this._db.prepare('INSERT INTO persons (name, age) VALUES (@name, @age)');
    return new Promise((resolve, reject) => {
      try {
        const result = this._db.transaction((persons) => {
          for (const person of persons) insertQuery.run(person);
        })(persons);

        resolve(result);
      } catch (error) {
        logger.error(TAG, error);
        reject(error);
      }
    });
  }

  update(person: IPerson) {
    return new Promise((resolve, reject) => {
      try {
        const updateStmt = this._db.prepare(`UPDATE persons SET name=@name, age=@age WHERE id=@id`);
        const result = updateStmt.run(person);
        resolve(result);
      } catch (error) {
        logger.error(TAG, error);
        reject(error);
      }
    });
  }

  deleteById(id: string) {
    return new Promise((resolve, reject) => {
      try {
        const deleteStmt = this._db.prepare(`DELETE FROM persons WHERE id=@id`);
        const result = deleteStmt.run({ id });
        resolve(result);
      } catch (error) {
        logger.error(TAG, error);
        reject(error);
      }
    });
  }

  queryById(id: string) {
    return new Promise((resolve, reject) => {
      try {
        const queryStmt = this._db.prepare(`SELECT * FROM persons WHERE id=@id`);
        const person = queryStmt.run({ id });
        resolve(person);
      } catch (error) {
        logger.error(TAG, error);
        reject(error);
      }
    });
  }

  queryAll() {
    return new Promise((resolve, reject) => {
      try {
        const queryStmt = this._db.prepare(`SELECT * FROM persons`);
        const list = queryStmt.all();
        resolve(list);
      } catch (error) {
        logger.error(TAG, error);
        reject(error);
      }
    });
  }
}

export default Person;
