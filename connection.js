"use strict";
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', //enter the password
    database: 'data-republic'
});

module.exports = connection;