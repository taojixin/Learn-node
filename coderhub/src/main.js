const app = require('./app')

// const connection = require('./app/database');
require('./app/database');  // 简写

const config = require('./app/config')





app.listen(8000, () => {
  console.log(`服务器在${config.APP_PORT}端口启动成功`);
})