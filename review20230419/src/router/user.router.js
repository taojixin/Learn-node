const KoaRouter = require("@koa/router")
const userController = require("../controller.js/user.controller")
const { verifyUser,handlePassword } = require("../moddleware/user.middleware")

const userRouter = new KoaRouter({prefix: "/users"})

// 用户注册接口
userRouter.post("/", verifyUser, handlePassword, userController.create)

module.exports = userRouter