const mockJournals = require('../../data/journals');

module.exports = function getAllJournalsHandler(request, h) {
  console.log(`Getting mock journals`);
  return { data: mockJournals };
}
