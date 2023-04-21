const connection = require("../app/database.js");
class MomentService {
  async create(content, userId) {
    const statement = "insert into moment (content, user_id) values (?, ?);";
    const [result] = await connection.execute(statement, [content, userId]);
    return result;
  }
  async queryList(offset = 0, size = 10) {
    const statement = `
    select
      m.id id, m.content content, m.createAt createTime, m.updataAt updataTime,
    json_object('id', u.id, 'name', u.name, 'createTime', u.crateAt, 'updataTime', u.updateAt) user
    from moment m
    left join user u on u.id = m.user_id
    limit ? offset ?;
    `;
    const [result] = await connection.execute(statement, [
      String(size),
      String(offset),
    ]);
    return result;
  }
  async queryById(id) {
    const statement = `
    select
      m.id id, m.content content, m.createAt createTime, m.updataAt updataTime,
    json_object('id', u.id, 'name', u.name, 'createTime', u.crateAt, 'updataTime', u.updateAt) user
    from moment m
    left join user u on u.id = m.user_id
    where m.id = ?
    `;
    const [result] = await connection.execute(statement, [id])
    return result
  }
  async update(content, id) {
    const statement = 'update moment set content = ? where id = ?;'
    const [result] = await connection.execute(statement, [content, id])
    return result
  }
}

module.exports = new MomentService();
