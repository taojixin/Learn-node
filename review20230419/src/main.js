const app = require("./app/index")
const { SERVER_PORT } = require('./config/server.js')
require('./utils/handle-error')

app.listen(SERVER_PORT, () => {
  console.log(`服务器${process.env.SERVER_PORT}启动成功`);
})