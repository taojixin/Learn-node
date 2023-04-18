const express = require('express')
const labelRouter = express.Router();

const {
  verifyAuth
} = require('../middleware/auth.middleware')
const {
  create,
  list
} = require('../controller/label.controller.js')

// 添加标签接口
labelRouter.post('/label', verifyAuth, create);
// 展示标签接口
labelRouter.get('/label', list)

module.exports = labelRouter;