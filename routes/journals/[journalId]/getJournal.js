const mockJournals = require('../../../data/journals');

module.exports = function getAllJournalsHandler(request, h) {
  const journalId = request.params.journalId;
  console.log(`Getting mock journal: ${journalId}`);
  return { data: mockJournals };
}
