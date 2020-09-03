// const _ = require('lodash');
// const mockJournals = require('../../../data/articles');
//
// mock handler
// module.exports = function getAllJournalsHandler(request, h) {
//   const articleId = request.params.articleId;
//   console.log(`Getting mock article: ${articleId}`);
//   const articleEntity = _.find(mockJournals, { id: articleId });
//   return { data: articleEntity };
// }


const axios = require('axios');
const CACHE = {};

// elife handler
// /articles/{id}
module.exports = function getAllJournalsHandler(request, h) {
  const articleId = request.params.articleId;
  const fullUrl = `https://prod--gateway.elifesciences.org/articles/${articleId}`;

  if (CACHE[fullUrl]) {
    console.log(`Retrieving article: ${articleId} from cache`);
    return { data: CACHE[fullUrl] };
  }

  console.log(`Retrieving article: ${articleId} from API`);

  return axios.get(fullUrl)
    .then(function (response) {
      CACHE[fullUrl] = response.data;
      return { data: response.data };
    })
    .catch(function (error) {
      console.log(error);
      return { error: 'BFF had a problem resolving data from an external API' }
    });
}
