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

// elife handler
// /articles/{id}
module.exports = function getAllJournalsHandler(request, h) {
  const articleId = request.params.articleId;
  console.log(`Retrieving article: ${articleId}`);

  let fullData;
  const fullUrl = `https://prod--gateway.elifesciences.org/articles/${articleId}`;
  console.log(`Sending request: ${fullUrl}`);

  return axios.get(fullUrl)
    .then(function (response) {
      fullData = response.data;
    })
    .catch(function (error) {
      // console.log(error.request.res.statusCode);
      // return res.status(500).send('Bad response from API');
      fullData = error
    })
    .then(function () {
      return {
        data: fullData
      };
    });
}
