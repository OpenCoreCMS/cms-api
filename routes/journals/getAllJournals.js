const mockJournals = require('../../data/journals');

module.exports = function getAllJournalsHandler(request, h) {
  console.log(`[Static] Getting journals`);
  return { data: mockJournals };
}
