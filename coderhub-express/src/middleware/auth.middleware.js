const jwt = require('jsonwebtoken')

const { PUBLIC_KEY } = require('../app/config');
const errorType = require('../constants/error-types');
const userService = require('../service/user.sevice');
const authServise = require('../service/auth.service')
const md5password = require('../utils/password-handle')


const verifyLogin = async (req, res, next) => {
  // 1.获取用户名和密码
  const {name,password} = req.body;
  // 2.判断用户名和密码是否为空
  if(!name || !password) {
    const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED);
    return res.app.emit('error', error, res);
  }
  // 3.判断用户是否存在
  const result = await userService.getUserByName(name);
  const user = result[0];
  if(!user) {
    const error = new Error(errorType.USER_DOES_NOT_EXISTS);
    return res.app.emit('error', error, res);
  }
  // 4.判断密码是否和数据库中的密码一致（加密）
  if(md5password(password) !== user.password) {
    const error = new Error(errorType.PASSWORD_IS_INCORRENT);
    return res.app.emit('error', error, res);
  }
  res.user = user;// 用于login中获取user数据
  await next();
}

// 用于验证token是否有效
const verifyAuth = async (req, res, next) => {
  console.log(('验证授权的middleware'));
  // 1.获取token
  const authorization = req.headers.authorization;
  if(!authorization) {
    const error = Error(errorType.UNAUTHORIZATION);
    return res.app.emit('error', error, res)
  }
  const token = authorization.replace("Bearer ", '');
  // 2.验证token
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"]
    });
    res.user = result;
    await next();
  } catch (err) {
    const error = Error(errorType.UNAUTHORIZATION);
    res.app.emit('error', error, res)
  }
}

// 验证受否有权限修改评论内容
const verifyPermission = async (req, res, next) => {
  console.log("验证权限的middleware~");
  // 1.获取参数
  const [resourceKey] = Object.keys(req.params);
  const tableName = resourceKey.replace('Id', '');
  const resourceId = req.params[resourceKey];
  const {id} = res.user;
  // 2.查询是否具备权限
  const isPermission = await authServise.checkResource(tableName,resourceId, id);
  if(!isPermission) {
    const error = new Error(errorType.AUPERISSION);
    return res.app.emit('error', error, res)
  }
  await next();
}



module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission
}