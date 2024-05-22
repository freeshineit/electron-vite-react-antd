// import sql from '.';

// const readAllPerson = () => {
//   try {
//     const query = `SELECT * FROM person`;
//     const readQuery = sql.prepare(query);
//     const rowList = readQuery.all();
//     return rowList;
//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// };

// const insertPerson = (name: string, age: number) => {
//   try {
//     const insertQuery = sql.prepare(`INSERT INTO person (name, age) VALUES ('${name}' , ${age})`);

//     const transaction = sql.transaction(() => {
//       const info = insertQuery.run();
//       console.log(`Inserted ${info.changes} rows with last ID ${info.lastInsertRowid} into person`);
//     });
//     transaction();
//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// };

// export { readAllPerson, insertPerson };
