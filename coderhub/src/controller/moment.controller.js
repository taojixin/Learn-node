const momentService = require('../service/moment.service')
class MomentController {
  
  async create(ctx, next) {
    // 1.获取数据（user_id,content）
    const userId = ctx.user.id;
    const content = ctx.request.body.content;

    // 2.将数据插入到数据库
    const result = await momentService.create(userId, content);
    ctx.body = result;
  }

  async detail(ctx, next) {
    // 1.获取数据（momentId）
    const momentId = ctx.params.momentId;
    // 2.根据id去查询这条数据
    const result = await momentService.getMomentById(momentId);

    ctx.body = result;
  }


  async list(ctx, next) {
    // 1.获取数据（offset/size）
    const {offset, size} = ctx.query;

    // 2.查询列表
    const result = await momentService.getMomentList(offset,size);
    ctx.body = result;
  }

  async update(ctx, next) {
    // 1.获取参数
    // const momentId = ctx.params.momentId;
    const {momentId} = ctx.params;
    const {content} = ctx.request.body;
    // 2.修改内容
    const result = await momentService.update(content, momentId);
    ctx.body = result;
  }

  
  async remove(ctx, next) {
    // 1.获取momentId
    const {momentId} = ctx.params;
    // 2.删除内容
    const result = await momentService.remove(momentId);
    ctx.body = result;
  }

  async addLabels(ctx, next) {
    // 1.获取标签和动态id
    const {labels} = ctx;
    const {momentId} = ctx.params;

    // 2.添加所有的标签
    for (let label of labels) {
      // 2.1判断标签是否已经和动态有关系了
      const isExist = await momentService.hasLabel(momentId, label.id);
      if(!isExist) {
        await momentService.addLabel(momentId, label.id)
      }
    }
    ctx.body = "给动态添加标签成功"
  }
}


module.exports = new MomentController();