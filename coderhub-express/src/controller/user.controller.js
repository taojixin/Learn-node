const servise = require('../service/user.sevice')

class UserController {
  async create(req, res, next) {
    // 获取用户请求传递的参数
    const user = req.body;

    // 数据库查询数据
    const result = await servise.create(user);
    // 返回数据
    res.json(result)
    // res.end() // end只能返回字符串
  }
}

module.exports = new UserController();