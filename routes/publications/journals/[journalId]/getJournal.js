const PublicationsAdapter = require('../../_adapters/autoselect');

module.exports = function getOneJournalHandler(req, res) {
  const journalId = req.params.journalId;
  console.log(`[API] Fetching journal: ${journalId}`);
  return PublicationsAdapter.getOneJournal(journalId, (journalErr, journalData) => {
    return res.json(journalData);
  });
}
