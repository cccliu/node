const {SuceessModel, ErrorModel} = require('./model/resModle');
const {getLogin} = require('./constroller/user');

const handleUserRouter = (req, res) => {
   const method = req.method;
//这是登录接口
	if (method === "POST" && req.path === "/api/user/login") {
		const {userName, password} = req.body;
		return getLogin(userName, password).then((PostData) => {
			 const userName = PostData.userName;
	          if(userName){
	          	return new SuceessModel('登录成功')
	          }else{
				return new ErrorModel('登录失败')
	          }
		  });
	}    
}

module.exports = handleUserRouter;