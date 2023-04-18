const express = require('express')
const userRouter = express.Router();
const {
  create
} = require('../controller/user.controller')
const {
  varfiyUser,
  handlePassword
} = require('../middleware/user.middleware')

// 用户注册接口
userRouter.post('/', varfiyUser, handlePassword, create)



module.exports = userRouter;