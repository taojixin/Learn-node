const Koa = require('koa')
// 用于解析body数据
const bodyParser = require('koa-bodyparser')

// const userRouter = require('../router/user.router')
// const authRouter = require('../router/auth.router')
const useRoutes = require('../router')

const errorHandler = require('./error-handle')

const app = new Koa();

app.useRoutes = useRoutes;

app.use(bodyParser());

// app.use(userRouter.routes());
// app.use(userRouter.allowedMethods());
// app.use(authRouter.routes());
// app.use(authRouter.allowedMethods());
app.useRoutes(app);

app.on('error', errorHandler)


module.exports = app;