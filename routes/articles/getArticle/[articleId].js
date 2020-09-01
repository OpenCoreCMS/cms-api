const _ = require('lodash');
const mockJournals = require('../../../data/articles');

module.exports = function getAllJournalsHandler(request, h) {
  const articleId = request.params.articleId;
  console.log(`Getting mock article: ${articleId}`);
  const articleEntity = _.find(mockJournals, { id: articleId });
  return { data: articleEntity };
}
