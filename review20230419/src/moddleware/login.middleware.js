const jwt = require("jsonwebtoken")

const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_NOT_EXISTS,
  PASSWORD_IS_INCORRENT,
  UNAUTHORIZATION,
} = require("../config/error");
const { PUBLIC_KEY } = require("../config/screct");
const userService = require("../service/user.service");
const md5Password = require("../utils/md5-password");

const verifyLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body;
  if (!name || !password) {
    return ctx.app.emit("error", NAME_OR_PASSWORD_IS_REQUIRED, ctx);
  }
  // 查询该用户是否在数据库中存在
  const users = await userService.findUserByName(name);
  const user = users[0];
  if (!user) {
    return ctx.app.emit("error", NAME_IS_NOT_EXISTS, ctx);
  }
  // 查询密码是否正确
  if (user.password !== md5Password(password)) {
    return ctx.app.emit("error", PASSWORD_IS_INCORRENT, ctx);
  }
  // 将user保存到ctx
  ctx.user = user;

  await next();
};

const verifyAuth = async (ctx, next) => {
  const authorization = ctx.headers.authorization;
  if (!authorization) {
    ctx.app.emit("error", UNAUTHORIZATION, ctx)
  }
  const token = authorization.replace("Bearer ", "");
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });
    // 将token的信息保留下来
    ctx.user = result
    await next()
  } catch (error) {
    console.log(error);
    ctx.app.emit("error", UNAUTHORIZATION, ctx)
  }

};

module.exports = {
  verifyLogin,
  verifyAuth
};
