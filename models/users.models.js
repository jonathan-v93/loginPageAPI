const db = require('../db/connection');

exports.createUser = (body) => {
    const { username, password, email } = body
    if (typeof username !== 'string' || typeof password !== 'string' || typeof email !== 'string') return Promise.reject('Bad Request');
    const keys = Object.keys(body);
    if (keys.length !== 3) return Promise.reject('Bad Request');
    return db.query(`
    INSERT INTO login_details
    (username, password, email)
    VALUES ($1, $2, $3)
    RETURNING *;`, [username, password, email]).then(({ rows }) => {
        return rows[0]
    })
}

exports.fetchUserWithUsername = (username) => {
    return db.query('SELECT username FROM login_details WHERE username = $1;', [username]).then(({ rows }) => {
        if (!rows[0]) return Promise.reject('Not found')
        return rows[0]
    })
}

exports.loginUser = (body, username) => {
    const { password } = body;
    const keys = Object.keys(body);
    if(keys.length !== 1) return Promise.reject('Bad Request')
    if (!password || typeof password !== 'string') {
        return Promise.reject('Bad Request')
    }
    return db.query('SELECT * FROM login_details WHERE username = $1 AND password = $2;', [username, password]).then(({ rows }) => {
        if (!rows[0]) return Promise.reject('Not Found')
        return rows[0]
    })
}