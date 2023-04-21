const connection = require("../app/database.js")

class UserService {
  async create(user) {
    const {name,password} = user
    const statement = 'insert into user (name, password) values (?, ?);'
    const [result] = await connection.execute(statement, [name, password])
    return result
  }
  async findUserByName(name) {
    const statement = 'select * from user where name = ?;'
    const [values] = await connection.execute(statement, [name])
    return values
  }
}

module.exports = new UserService()