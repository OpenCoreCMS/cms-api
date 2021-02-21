const MongoLib = require('../../../lib/mongo');

module.exports = function getSettingValueHandler(req, res) {
  const settingName = req.params.settingName;

  return MongoLib.settings.find({ name: settingName }, (settingErr, settingData) => {
    return res.json({ data: settingData[0] });
  });
}
