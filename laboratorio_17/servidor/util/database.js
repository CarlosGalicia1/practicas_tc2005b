const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'lab17',
    password: 'cags2003'
});

module.exports = pool.promise();