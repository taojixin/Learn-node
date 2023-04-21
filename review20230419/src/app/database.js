const mysql = require("mysql2");

// 连接池
const connection = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "123456",
  database: "coderhub",
  connectionLimit: 5
})

connection.getConnection((err, connection) => {
  // 判断是否有错误信息
  if (err) {
    console.log("数据库连接失败", err);
    return 
  }
  // 获取connection，尝试和是数据库建立连接
  connection.connect(err => {
    if (err) {
      console.log("和数据库连接失败", err);
    } else {
      console.log("和数据库连接成功，可以进行操作");
    }
  })
})

module.exports = connection.promise()
