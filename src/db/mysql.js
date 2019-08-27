const mysql = require('mysql');

// const {MYSQL_CONF} = require('../config/bd');


const MYSQL_CONF = {
 	host: 'localhost',
	user: 'root',
	password: 'liubaichi',
	port: '3306',
	database: 'myblogs'	
  }
const con = mysql.createConnection(MYSQL_CONF);

con.connect();

//执行 sql 语句
function exec (sql) {
	return new Promise((resolve, reject) => {
		con.query(sql, (error, result) => {
		    if(error){
		       reject(error);
		       return false
		    }
		    resolve(result);
		})
	})
}

module.exports = {
	exec
}