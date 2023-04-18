const errorTypes = require('../constants/error-types')

const errorHandler = (error, res) => {
  let status, message;

  switch (error.message) {
    case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400;
      message = "用户名或密码不能为空";
      break;

    case errorTypes.USER_ALREADY_EXISTS:
      status = 409;
      message = "用户已存在";
      break;

    case errorTypes.USER_DOES_NOT_EXISTS:
      status = 409;
      message = "用户不存在";
      break;

    case errorTypes.PASSWORD_IS_INCORRENT:
      status = 409;
      message = "密码错误";
      break;

    case errorTypes.UNAUTHORIZATION:
      status = 401;
      message = "无效token";
      break;

    case errorTypes.AUPERISSION:
      status = 401;
      message = "您不具备操作的权限";
      break;
      

    default:
      status = 404;
      message = "NOT FOUND"
  }

  res.status = status;
  res.end(message);
}

module.exports = errorHandler;