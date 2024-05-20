import type Sql from '.';

class Tables {
  _sql: Sql;
  constructor(sql: Sql) {
    this._sql = sql;
    this._createTable();
  }

  async _createTable() {
    this._sql.createTable(`
      CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        age INTEGER
      )
    `);
  }

  // 创建表
}

export default Tables;
