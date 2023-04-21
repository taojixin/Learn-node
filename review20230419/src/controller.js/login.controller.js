const jwt = require("jsonwebtoken");
const { PRIVATE_KEY, PUBLIC_KEY } = require("../config/screct");

class LoginController {
  signs(ctx, next) {
    const { id, name } = ctx.user;
    // 颁发令牌token
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: "RS256",
    });
    ctx.body = {
      code: 0,
      data: {
        id,
        name,
        token
      },
    };
  }

  test(ctx, next) {
    ctx.body = {
      message: "验证通过"
    }

  }
}

module.exports = new LoginController();
