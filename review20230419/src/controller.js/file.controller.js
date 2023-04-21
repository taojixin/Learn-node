const fs = require("fs");
const { UPLOAD_PATH } = require("../config/path");
const { log } = require("console");

class FileController {
  create(ctx,next) {
    console.log(ctx.request.file);
    ctx.body = {
      message: "上传成功！"
    }
  }
  getAvatar(ctx, next) {
    // const {filename, mimetype} = ctx.request.body.info
    // ctx.type = mimetype
    // console.log(filename, mimetype);
    console.log("sf");
    ctx.type = 'image/png'
    ctx.body = fs.createReadStream(`${UPLOAD_PATH}/92cabeafcd76b20497f38cf30d0e956f`)
  }
}

module.exports = new FileController()