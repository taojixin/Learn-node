const express = require('express');
const commentRouter = express.Router();

const {
  verifyAuth,
  verifyPermission
} = require('../middleware/auth.middleware');
const {
  create,
  reply,
  update,
  remove,
  list
} = require('../controller/comment.controller.js');
const momentRouter = require('./moment.router');

// 对动态进行评论
commentRouter.post('/comment', verifyAuth, create)
// 对评论进行评论
commentRouter.post('/comment/:commentId/reply', verifyAuth, reply)
// 修改评论
momentRouter.patch('/comment/:commentId', verifyAuth, verifyPermission, update)
// 删除评论
momentRouter.delete('/comment/:commentId', verifyAuth, verifyPermission, remove)
// 获取评论列表
momentRouter.get('/comment', list)

module.exports = commentRouter;