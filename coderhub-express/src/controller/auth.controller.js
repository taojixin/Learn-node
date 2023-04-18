//  npm install jsonwebtoken
const jwt = require('jsonwebtoken')
const {PRIVATE_KEY} = require('../app/config')


class AuthController {

  async login(req, res, next) {
    // 颁发token
    const {id,name} = res.user;
    const token = jwt.sign({id,name}, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,   // 设置失效时间，这里是一天
      algorithm: 'RS256',   // 指明加密算法
    })
    res.json({id,name,token})  // json参数可以是object, array, string, Boolean, number, or null
    // res.end({id,name,token})  // 不能是end，end参数只能为String或buffer
    // const {name} = req.body;
    // res.end(`登录成功，欢迎${name}回来`)
  }

  async success(req, res, next) {
    res.end('授权成功')
  }
}

module.exports = new AuthController();