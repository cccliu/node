const {exec} = require('../db/mysql');

const getLogin = (userName, password) => {
   if (userName && password) {
       const sql = `select userName, password from users where userName='${userName}' and password='${password}' `;
	    return exec(sql).then((datas) => {
			return datas[0]
	    })
    }else{
    	return false
    }
}
module.exports = {
   getLogin
}