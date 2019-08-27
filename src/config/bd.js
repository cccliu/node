const env = process.env.NODE_ENV //判断是开发或是生产环境

// 配置
let MYSQL_CONF = null;

console.log('env',env)

if(env === 'dev'){
    MYSQL_CONF = {
    	host: 'localhost',
		user: 'root',
		password: 'liubaichi',
		port: '3306',
		database: 'myblogs'
    }
}

if (env === 'production') {
    MYSQL_CONF = {
    	host: 'localhost',
		user: 'root',
		password: 'liubaichi',
		port: '3306',
		database: 'myblogs'
    }
}

module.exports = {
   MYSQL_CONF
}
