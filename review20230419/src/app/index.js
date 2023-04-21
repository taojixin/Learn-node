const koa = require('koa')
const bodyParser = require("koa-bodyparser")

const registerRouters = require("../router")

const userRouter = require("../router/user.router.js")
const loginRouter = require("../router/login.router.js")

const app = new koa()

app.use(bodyParser())

// 手动导入路由
// app.use(userRouter.routes())
// app.use(loginRouter.routes())
// app.use(userRouter.allowedMethods())
// 自动导入路由
registerRouters(app)

module.exports = app