const MongoLib = require('../../../lib/mongo');

module.exports = async function getAllJournalsHandler(request, h) {
  return new Promise(resolve => {
    MongoLib.journals.find({}, (allJournalsErr, allJournalsData) => {
      resolve({ data: allJournalsData });
    });
  });
}
