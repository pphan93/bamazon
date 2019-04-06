var mysql = require("mysql");
var config = require("./dbconfig");

var mysql = require('mysql');

var connection = mysql.createConnection(config);

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
});

module.exports = connection;