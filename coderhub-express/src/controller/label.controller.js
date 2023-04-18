const service = require('../service/label.service.js')

class LabelController {
  async create(req, res, next) {
    const {name} = req.body;
    const result = await service.create(name);
    res.json(result);
  }

  async list(req, res, next) {
    const {limit, offset} = req.query;
    const result = await service.getLabels(limit, offset);
    res.json(result)
  }
}


module.exports = new LabelController();