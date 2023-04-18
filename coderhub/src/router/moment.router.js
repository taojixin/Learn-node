const Router = require('koa-router')

const momentRouter = new Router({prefix: '/moment'});

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
const {
  verifyAuth,
  verifyPermission
} = require('../middleware/auth.middleware')

// 发表动态接口
momentRouter.post('/', verifyAuth, create);
// 查询多个动态
momentRouter.get('/', list)
// 根据id查询单个动态
momentRouter.get('/:momentId', detail);
// 修改动态
momentRouter.patch('/:momentId', verifyAuth, verifyPermission, update)
// 删除动态
momentRouter.delete('/:momentId', verifyAuth, verifyPermission, remove)
// 给动态添加标签
momentRouter.post('/:momentId/labels', verifyAuth, verifyPermission, verifyLabelExists, addLabels)



module.exports = momentRouter;