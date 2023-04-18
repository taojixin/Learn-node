const express = require('express');
const momentRouter = express.Router();

const {
  verifyAuth,
  verifyPermission
} = require('../middleware/auth.middleware');
const {
  create,
  detail,
  list,
  update,
  remove,
  addLabels
} = require('../controller/moment.controller')
const {
  verifyLabelExists
} = require('../middleware/label.middleware.js')

// 发表动态接口
momentRouter.post('/moment', verifyAuth, create);
// 查询多个动态
momentRouter.get('/moment', list) 
// 根据id查询单个动态
momentRouter.get('/moment/:momentId', detail) 
// 修改动态 verifyAuth:验证token verifyPermission:验证是否有修改的权限 update:验证都通过后进行修改
momentRouter.patch('/moment/:momentId', verifyAuth, verifyPermission, update)
// 删除动态
momentRouter.delete('/moment/:momentId', verifyAuth, verifyPermission, remove)
// 给动态添加标签
momentRouter.post('/moment/:momentId/labels', verifyAuth, verifyPermission, verifyLabelExists, addLabels)

module.exports = momentRouter;