const PublicationsAdapter = require('../_adapters/autoselect');

module.exports = function getAllJournalsHandler(req, res) {
  console.log(`[API] Fetching all journals`);
  const journalData = PublicationsAdapter.getAllJournals((journalDataError, journalDataResult) => {
    return res.json(journalDataResult);
  });
}
