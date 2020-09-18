const PublicationsAdapter = require('../../_adapters/elife');
const CACHE = {};

module.exports = async function getCurrentIssueHandler(request, h) {
  const journalId = request.params.journalId;

  if (CACHE[journalId]) {
    console.log(`[Cache] Fetching results for current issue of journal: ${journalId}`);
    return CACHE[journalId];
  }

  console.log(`[API] Fetching results for current issue of journal: ${journalId}`);

  const currentIssueContent = await PublicationsAdapter.getCurrentIssue();
  CACHE[journalId] = currentIssueContent;
  return currentIssueContent;
}
