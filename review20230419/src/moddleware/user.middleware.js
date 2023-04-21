const { NAME_OR_PASSWORD_IS_REQUIRED, NAME_OR_PASSWORD_EXISTS } = require("../config/error");
const userService = require("../service/user.service");
const md5Password = require("../utils/md5-password");

const verifyUser = async (ctx, next) => {
  const user = ctx.request.body;
  const { name, password } = user;
  if (!name || !password) {
    return ctx.app.emit('error', NAME_OR_PASSWORD_IS_REQUIRED, ctx)
  }
  const users = await userService.findUserByName(name);
  if (users.length) {
    return ctx.app.emit('error', NAME_OR_PASSWORD_EXISTS, ctx)
  }
  await next();
};

const handlePassword = async (ctx, next) => {
  const {password} = ctx.request.body
  ctx.request.body.password = md5Password(password)
  await next()
}

module.exports = {
  verifyUser,
  handlePassword
};
