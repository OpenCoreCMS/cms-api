const PublicationsAdapter = require('../../_adapters/autoselect');
const CACHE = {};

module.exports = function getCurrentIssueHandler(req, res) {
  const journalId = req.params.journalId;

  if (CACHE[journalId]) {
    console.log(`[Cache] Fetching results for current issue of journal: ${journalId}`);
    return res.json(CACHE[journalId]);
  }

  console.log(`[API] Fetching results for current issue of journal: ${journalId}`);

  return PublicationsAdapter.getCurrentIssue((currentIssueError, currentIssueContent) => {
    CACHE[journalId] = currentIssueContent;
    return res.json(currentIssueContent);
  });
}
