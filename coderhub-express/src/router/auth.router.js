const express = require('express');
const authRouter = express.Router();
const {
  verifyLogin,
  verifyAuth
} = require('../middleware/auth.middleware');
const {
  login,
  success
} = require('../controller/auth.controller')

// 用户登录接口
authRouter.post('/login', verifyLogin, login);
// 用户登录验证，验证token是否正确从而进行登录验证
authRouter.get('/test', verifyAuth, success);

module.exports = authRouter;