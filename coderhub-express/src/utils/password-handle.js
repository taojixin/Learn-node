const crypto = require('crypto');

// 用于密码加密的函数
const md5password = (password) => {
  const md5 = crypto.createHash('md5');
  const result = md5.update(password).digest('hex');
  return result;
}

module.exports = md5password;