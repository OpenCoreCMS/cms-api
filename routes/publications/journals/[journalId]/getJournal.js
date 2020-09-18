const PublicationsAdapter = require('../../_adapters/autoselect');

module.exports = async function getOneJournalHandler(request, h) {
  const journalId = request.params.journalId;
  console.log(`[API] Fetching journal: ${journalId}`);
  const journalData = await PublicationsAdapter.getOneJournal(journalId);
  return journalData;
}
