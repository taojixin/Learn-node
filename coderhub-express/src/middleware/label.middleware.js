const service = require('../service/label.service')

const verifyLabelExists = async (req, res, next) => {
  // 1.取出要添加的所有的标签
  const {labels} = req.body;

  // 2.判断每一个标签在label表中是否存在
  const newLabels = [];
  for (let name of labels) {
    const labelResult = await service.getLabelByName(name);
    const label = {name};
    if(!labelResult) {
      // 创建标签
      const result = await service.create(name);
      label.id = result.insertId;
    } else {
      label.id = labelResult.id;
    }
    newLabels.push(label);
  }
  res.labels = newLabels;

  await next();
}

module.exports = {
  verifyLabelExists
}