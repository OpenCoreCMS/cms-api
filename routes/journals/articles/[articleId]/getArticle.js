const axios = require('axios');
const CACHE = {};

module.exports = function getAllJournalsHandler(request, h) {
  const articleId = request.params.articleId;
  const fullUrl = `https://prod--gateway.elifesciences.org/articles/${articleId}`;

  if (CACHE[fullUrl]) {
    console.log(`[Cache] Retrieving article: ${articleId}`);
    return { data: CACHE[fullUrl] };
  }

  console.log(`[API] Retrieving article: ${articleId}`);

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
