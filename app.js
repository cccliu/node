const handleUserRouter= require('./src/userName');
const handleBlogRouter= require('./src/blog');
const querystring = require('querystring');

const getPostData = (req) => {
    return new Promise((resolve,reject) => {
        const method = req.method;
        if(method !== 'POST'){
           resolve({})
           return false
        }
        if(req.headers['content-type'] !== 'application/json'){
            resolve({})
           return false
        }
       
        let postData = '';
        req.on('data', (items) => {
            postData+=items.toString();
        })
        req.on('end', () => {
            if(!postData){
                resolve({})
                return false
            } 
            resolve(JSON.parse(postData))
        })
    })
}

const severHandle = (req, res) => {
	res.setHeader('Content-type','application/json');
    const url = req.url;
    req.path = url.split('?')[0];

  //解析query参数
    req.query= querystring.parse(url.split('?')[1])

    getPostData(req).then((postDatas) => {
        req.body = postDatas //不是post的请求，那就是空对象！
    // 处理blog路由
       const blogResult = handleBlogRouter(req, res);
        if (blogResult) {
            blogResult.then((blogData) => {
               if (blogData) {
                    res.end(JSON.stringify(blogData));
                }
            })
            return false
        }
       
    // 处理user路由
        const userData= handleUserRouter(req, res);
        if (userData) {
            userData.then((datas) => {
                res.end(JSON.stringify(datas));
            })
           return false
        } 
        //未命中路由，返回404
        res.writeHead(404, {"Content-type": "text/plain"})
        res.write("404 Not Found\n")
        res.end()
    })
}
module.exports = severHandle;