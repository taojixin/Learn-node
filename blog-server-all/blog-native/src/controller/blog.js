const { exec } = require('../db/mysql')

// 1.获取博客列表
const getList = (author, keyword) => {
  let sql = `select * from blogs where 1=1 `
  if (author) {
    sql += `and author='${author}'`
  }
  if (keyword) {
    sql += `and title like '%${keyword}%'`
  }
  sql += `order by createtime desc;`

  // 返回 promise
  return exec(sql)
}

// 2.获取博客详情
const getDetail = (id) => {
  const sql = `select * from blogs where id='${id}'`
  return exec(sql).then(rows => {
    return rows[0]  // 这里这样写的原因：因为查询返回的是数组，这里只查询一个，数组中只有一个内容，所以提取出来这里返回对象
  })
}


// 3.新建一篇博客
const newBlog = (blogData = {}) => {
  // blogData 是一个博客对象，包括title content等
  const title = blogData.title
  const content = blogData.content
  const author = blogData.author
  const createTime = Date.now()

  const sql = `INSERT INTO blogs (title,content,createtime,author) VALUE ('${title}', '${content}', ${createTime}, '${author}')`
  return exec(sql).then(insertData => {
    // console.log(insertData); // 输出为：
    // OkPacket {
    //   fieldCount: 0,
    //   affectedRows: 1,
    //   insertId: 3,
    //   serverStatus: 2,
    //   warningCount: 0,
    //   message: '',
    //   protocol41: true,
    //   changedRows: 0
    // }
    return {
      id: insertData.insertId
    }
  })
}

// 4.更新一篇博客
const updateBlog = (id, blogData = {}) => {
  // id 就是更新博客的id
  // blogData是一个博客对象， 包括title content等
  const title = blogData.title
  const content = blogData.content
  const sql = `update blogs set title='${title}', content='${content}' where id=${id}`

  return exec(sql).then(updateData => {
    // console.log(updateData); // 返回：
    // OkPacket {
    //   fieldCount: 0,
    //   affectedRows: 1,
    //   insertId: 0,
    //   serverStatus: 2,
    //   warningCount: 0,
    //   message: '(Rows matched: 1  Changed: 1  Warnings: 0',
    //   protocol41: true,
    //   changedRows: 1
    // }
    if (updateData.affectedRows > 0) {
      return true
    }
    return false
  })
}

// 5.删除一篇博客
const delBlog = (id, author) => {
  // id 为要删除的id
  const sql = `delete from blogs where id='${id}' and author='${author}'`
  return exec(sql).then(delData => {
    console.log(delData);
    if (delData.affectedRows > 0) {
      return true
    }
    return false
  })

}


module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}