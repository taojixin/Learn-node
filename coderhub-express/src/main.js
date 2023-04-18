const app = require('./app');
// const config = require('dotenv').config()  // 另一种写法，不用单独创建config.js文件了
const config = require('./app/config')




app.listen(8001, () => {
  console.log(`服务器在${config.APP_PORT}端口启动成功`);
})