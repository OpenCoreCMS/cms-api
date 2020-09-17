const MongoLib = require('../../../../lib/mongo');

module.exports = async function getOneJournalHandler(request, h) {
  return new Promise(resolve => {
    const journalId = request.params.journalId;
    console.log(`[API] Getting journal: ${journalId}`);

    MongoLib.journals.find({ id: journalId }, (journalErr, journalData) => {
      resolve({ data: journalData[0] });
    });
  });
}
