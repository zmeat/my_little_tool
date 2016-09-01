var mysql = require('mysql');
var _= require('lodash');
var Seq = require('seq');
var connection = mysql.createConnection({
    host     : 'localhost',
    user : "zjw",
    password : "123456",
    database : 'zjw'
});

_.extend(module.exports, {
    connection : connection
});