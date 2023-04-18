const Router = require('koa-router')
const {
  verifyAuth
} = require('../middleware/auth.middleware')
const {
  create,list
} = require('../controller/label.controller.js')



const labelRouter = new Router({prefix:'/label'})

// 添加标签接口
labelRouter.post('/', verifyAuth, create);
// 展示标签的接口
labelRouter.get('/', list);

module.exports = labelRouter;