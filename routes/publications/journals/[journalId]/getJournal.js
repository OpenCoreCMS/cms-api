const PublicationsAdapter = require('../../_adapters/elife');

module.exports = async function getOneJournalHandler(request, h) {
  const journalId = request.params.journalId;
  console.log(`[API] Fetching journal: ${journalId}`);
  const journalData = await PublicationsAdapter.getOneJournal(journalId);
  return journalData;
}
