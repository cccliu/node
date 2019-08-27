const {exec} = require('../db/mysql');
//获取博客列表
const getList = (author, keyword) => {
        let sql = '';
            sql+= `select * from blogs where 1=1 `;    
        if (author) {
            sql+= `and author='${author}' `;
        }

        if (keyword) {
            sql+= `and title like '%${keyword}%' `;
        }
        sql+= `order by createtime desc`;
      return exec(sql);
}

//博客详情 
const getDetail = (id) => {
    let sql = '';
        sql+=`select *from blogs where id='${id}' `;
        return exec(sql).then((rows) => {
            return rows[0];
        });
}
//新建博客
const getNew = (blogData) => {
//blogData 是一个博客对象 ，包含title content author属性
    const title = blogData.title;
    const content = blogData.content;
    const author = blogData.author || '张三';
    const createtime = Date.now();
    const sql = `insert into blogs (title,content,author,createtime) value ('${title}','${content}','${author}','${createtime}') `;
    return exec(sql).then((datas) => {
        return {
            id: datas.insertId
        }
    });
}
//更新博客
const getUpdate = (id, blogData) => {
    const title = blogData.title;
    const content = blogData.content;
    const sql = `update blogs set title='${title}',content='${content}' where id='${id}'`;
    return exec(sql).then((datas) => {
        const affectedRows = datas.affectedRows;
        if (affectedRows > 0) {
           return true
        }
    });
}
//删除博客
const getDel = (id) => {
    const sql = `delete from blogs where id='${id}'`;
    return exec(sql).then((datas) => {
        const affectedRows = datas.affectedRows;
        if (affectedRows > 0) {
           return true
        }
    })
}
module.exports = {
    getList,
    getDetail,
    getNew,
    getUpdate,
    getDel
}

