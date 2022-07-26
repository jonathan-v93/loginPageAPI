const format = require("pg-format");

const db = require("../connection");
const { dropTables, createTables } = require("../helpers/manage-tables");

const seed = async ({ userData }) => {
    await dropTables();
    await createTables();

    const insertUsersQueryStr = format(
        "INSERT INTO login_details ( username, email, password) VALUES %L RETURNING *;",
        userData.map(({ username, email, password }) => [
            username,
            email,
            password,
        ])
    );
    const usersPromise = db
        .query(insertUsersQueryStr)
        .then((result) => result.rows);

    await usersPromise;

};

module.exports = seed;
