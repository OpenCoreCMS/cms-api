const mockJournals = require('../../data/journals');

module.exports = function getAllJournalsHandler(request, h) {
  const phrase = request.query.phrase;
  console.log(`Getting mock journals`);
  return { data: mockJournals };
}
