const errorType = require('../constants/error-types')
const service = require('../service/user.sevice')
const md5password = require('../utils/password-handle')

// 用于验证基本信息的中间件
const varfiyUser = async (req, res, next) => {
  // 1.获取用户和密码
  const {name,password} = req.body;
  // 2.判断用户或密码不能为空
  if(!name || !password || name === '' || password === '') {
    const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED);
    return res.app.emit('error', error, res)
  }
  // 3.判断用户是否已经存在
  const result = await service.getUserByName(name);
  if(result.length) {
    const error = new Error(errorType.USER_ALREADY_EXISTS);
    return res.app.emit('error', error, res);
  }

  await next();
}

// 用于密码加密的中间件
const handlePassword = async (req, res, next) => {
  const {password} = req.body;
  req.body.password = md5password(password);

  await next();
}

module.exports = {
  varfiyUser,
  handlePassword
}