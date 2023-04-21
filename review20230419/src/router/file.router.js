const KoaRouter = require("@koa/router")
const { handleAvatar } = require("../moddleware/file.middleware")
const { create,getAvatar } = require("../controller.js/file.controller")

const fileRouter = new KoaRouter({prefix: '/file'})

fileRouter.post('/avatar', handleAvatar, create)
fileRouter.get("/getavatar", getAvatar)

module.exports = fileRouter