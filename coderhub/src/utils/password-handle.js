const crypto = require('crypto')  //crypto是node中自带的一个库

const md5password = (password) => {
  const md5 = crypto.createHash('md5');  // 采用 md5 加密
  const result = md5.update(password).digest('hex');  // digest('hex')返回十六进制的字符串；digest()返回buffer
  return result;
}

module.exports = md5password;