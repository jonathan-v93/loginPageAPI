const db = require("../connection");

const createTables = async () => {
  await db.query(`
  CREATE TABLE login_details (
    username VARCHAR PRIMARY KEY,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL
  );`);
}

const dropTables = async () => {
  await db.query(`DROP TABLE IF EXISTS login_details;`);
};

module.exports = { createTables, dropTables };
