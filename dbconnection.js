var mysql = require('mysql');
// var mysqlmodel = require('mysql-model');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'password',
	database: 'ongc',
	multipleStatements: true
});

connection.connect(function(err){
	if(!err) {
		console.log("database connected");
	}
	else{
		console.log("Connection failed");
	}
})


module.exports = connection;	