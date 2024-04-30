const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'lab18',
    password: 'cags2003',
    connectionLimit:5
});

module.exports = pool.promise();