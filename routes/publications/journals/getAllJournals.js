const PublicationsAdapter = require('../_adapters/elife');

module.exports = async function getAllJournalsHandler(request, h) {
  console.log(`[API] Fetching all journals`);
  const journalData = await PublicationsAdapter.getAllJournals();
  return journalData;
}
