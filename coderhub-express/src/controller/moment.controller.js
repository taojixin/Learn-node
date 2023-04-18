const momentService = require("../service/moment.service");


class MomentCtroller {

  async create(req, res, next) {
    // 1.获取数据（user_id,content）
    const userId = res.user.id;
    const content = req.body.content;
    // 2.将数据插入到数据库
    const result = await momentService.create(userId, content);
    res.json(result);   // 再一次犯错。这里不能用end，错误找了半天
  }

  async detail(req, res, next) {
    // 1.获取数据（momentId)
    const momentId = req.params.momentId;
    console.log(momentId);
    // 2.根据id去查询这条数据
    const result = await momentService.getMomentById(momentId);
    res.json(result)
  }

  async list(req, res, next) {

    // 1.获取数据（offset、size）
    const {offset,size} = req.query;
    // 2.查询列表
    const result = await momentService.getMomentList(offset,size);
    res.json(result);
  }

  async update(req, res, next) {
    // 1.获取参数
    const {momentId} = req.params;
    const {content} = req.body;

    // 2.修改内容
    const result = await momentService.update(content, momentId);
    res.json(result);
  }

  async remove(req, res, next) {
    const {momentId} = req.params;
    const result = await momentService.remove(momentId)
    res.json(result)
  }

  async addLabels(req, res, next) {
    // 1.获取标签和动态
    const {labels} = res;
    const {momentId} = req.params;

    // 2.添加所有的标签
    for(let label of labels) {
      // 2.1判断标签是否已经和动态有关系了
      const isExist = await momentService.hasLabel(momentId, label.id);
      if(!isExist) {
        await momentService.addLabel(momentId, label.id)
      }
    }
    res.end("给动态添加标签成功")
  }
}


module.exports = new MomentCtroller();