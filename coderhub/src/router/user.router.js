const Router = require('koa-router')
const {
  create,
  avatarInfo
} = require('../controller/user.controller');
const {
  varfiyUser,
  handlePassword
} = require('../middleware/user.middleware')

const userRouter = new Router({prefix: '/users'});

// varfiyUser中间件用于验证用户名用户密码是否为空或重复
userRouter.post('/users', varfiyUser, handlePassword, create);
userRouter.get('/:userId/avatar', avatarInfo)

module.exports = userRouter