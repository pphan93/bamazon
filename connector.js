var mysql = require("mysql");
var config = require("./dbconfig");

var mysql = require('mysql');

var connection = mysql.createConnection(config);

connection.connect(function (err) {
    if (err) throw err;
});


module.exports = connection;
module.exports.runQuery= function (query,inputvalue, callback) {
    return connection.query(query,inputvalue, function (err, res) {
        if (err) throw err;
        var object = {};
        for (var i = 0; i < res.length; i++) {
            var id = res[i].id;
            delete res[i].id;
           object[id] = res[i];
        }

        return callback(object);
    });};
