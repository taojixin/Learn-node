const service = require('../service/comment.service.js')

class CommentController {
  async create(req, res, next) {
    const {momentId, content} = req.body;
    const {id} = res.user;

    const result = await service.create(momentId, content, id);

    res.json(result)
  }

  async reply(req, res, next) {
    const {momentId, content} = req.body;
    const {commentId} = req.params;
    const {id} = res.user;
    const result = await service.reply(momentId, content, id, commentId);
    res.json(result)
  }

  async update(req, res, next) {
    const {commentId} = req.params;
    const {content} = req.body;
    const result = await service.update(commentId, content);
    res.json(result)
  }

  async remove(req, res, next) {
    const {commentId} = req.params;
    const result = await service.remove(commentId);
    res.json(result)
  }

  async list(req, res, next) {
    const {momentId} = req.query;
    const result = await service.getCommentsByMomentId(momentId)
    res.json(result)
  }
}

module.exports = new CommentController();