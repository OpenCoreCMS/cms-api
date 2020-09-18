const MongoLib = require('../../../lib/mongo');

module.exports = async function getSettingValueHandler(request, h) {
  const settingName = request.params.settingName;

  return new Promise(resolve => {
    MongoLib.settings.find({ name: settingName }, (settingErr, settingData) => {
      resolve({ data: settingData[0] });
    });
  });
}
