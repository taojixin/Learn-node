const connection = require("../app/database.js")

class PermissionService {
  async checkMoment(momentId, userId) {
    const statement = "select * from moment where id = ? and user_id = ?;"
    const [result] = await connection.execute(statement, [momentId,userId])
    return !!result.length
  }
}

module.exports = new PermissionService()