const KoaRouter = require("@koa/router")
const { signs, test } = require("../controller.js/login.controller")
const { verifyLogin, verifyAuth } = require("../moddleware/login.middleware")

const loginRouter = new KoaRouter({prefix: '/login'})

loginRouter.post('/', verifyLogin, signs)
loginRouter.post('/test', verifyAuth ,test)

module.exports = loginRouter