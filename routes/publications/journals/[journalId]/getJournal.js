const _ = require('lodash');
const mockJournals = require('../../../../data/journals');

module.exports = function getAllJournalsHandler(request, h) {
  const journalId = request.params.journalId;
  console.log(`[Static] Getting journal: ${journalId}`);
  const journalEntity = _.find(mockJournals, { id: journalId });
  return { data: journalEntity };
}
