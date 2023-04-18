const {getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog.js')
const { SuccessModel, ErrorModel } = require('../model/resModel.js')


const handleBlogRouter = (req, res) => {
  const method = req.method
  const id = req.query.id

  // 1.获取博客列表
  if (method === 'GET' && req.path === '/api/blog/list') {
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''
    // const listData = getList(author, keyword)
    // return new SuccessModel(listData)
    const result = getList(author, keyword)
    return result.then(listData => {
      return new SuccessModel(listData)
    })
    
  }

  // 2.获取博客详情
  if (method === 'GET' && req.path === '/api/blog/detail') {
    const result = getDetail(id)
    return result.then(data => {
      return new SuccessModel(data)
    })
  }

  // 3.新建一篇博客
  if (method === 'POST' && req.path === '/api/blog/new') {
    // req.body 为post请求携带的数据
    req.body.author = 'tjx' // 假数据，
    const result = newBlog(req.body)
    return result.then(data => {
      return new SuccessModel(data)
    })
  }

  // 4.更新一篇博客
  if (method === 'POST' && req.path === '/api/blog/update') {
    const result = updateBlog(id, req.body)
    return result.then(val => {
      if (val) {
        return new SuccessModel()
      } else {
        return new ErrorModel('更新博客失败')
      }
    })
  }

  // 5.删除一篇博客
  if (method === 'POST' && req.path === '/api/blog/del') {
    const author = 'zhangsan'
    const result = delBlog(id, author)
    console.log(id);
    return result.then(val => {
      if (val) {
        return new SuccessModel()
      } else {
        return new ErrorModel("删除博客失败")
      }
    })
  }
}

module.exports = handleBlogRouter