
const {SuceessModel, ErrorModel} = require('./model/resModle');
const {getList, getDetail, getNew, getUpdate, getDel} = require('./constroller/blog');

const handleBlogRouter = (req, res) => {
    const method = req.method;
    const id = req.query.id || '';

   //获取博客列表查询
    if (method === "GET" && req.path === "/api/blog/list") {
    	const author = req.query.author || ''
    	const keyword = req.query.keyword || ''

        return getList(author, keyword).then((result) => {
          return new SuceessModel(result)
        })
    }
   // 获取博客详情
   if (method === "GET" && req.path === "/api/blog/detail") {
      return getDetail(id).then((datas) => {
        return new SuceessModel(datas)
      })
   }
   //新建一篇博客
    if (method === "POST" && req.path === "/api/blog/new") {
        const postData = req.body
        return getNew(postData).then((datas) => {
          return new SuceessModel(datas)
        })
    }
  //更新一篇博客
   if (method === "POST" && req.path === "/api/blog/upstate") {
      return getUpdate(id, req.body).then((updataData) => {
        if(updataData){
          return new SuceessModel(updataData);
        }else{
          return new ErrorModel('博客更新失败');
        }
      })
   }
  //删除一篇博客
   if (method === "POST" && req.path === "/api/blog/del") {
      return getDel(id).then((delData) => {
         if(delData){
            return new SuceessModel(delData)
          }else{
           return new ErrorModel('博客删除成功')
          }
      })
   }
}

module.exports = handleBlogRouter;