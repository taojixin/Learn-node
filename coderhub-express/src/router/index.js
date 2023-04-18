// 暂时没用这种写法，不知道为啥momentRouter的时候会错

const fs = require('fs')

const useRouters = function() {
  fs.readdirSync(__dirname).forEach(file => {
    // if(file === 'index.js') return;
    const router = require(`./${file}`);
    this.use('/', router);
  })
}

module.exports = useRouters;