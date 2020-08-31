const mockJournals = require('../../data/journals');

module.exports = function getJournalsHandler(request, h) {
  const { phrase } = request.query;
  console.log(`Getting mock journals`);
  return { data: mockJournals };
}
