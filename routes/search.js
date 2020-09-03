const axios = require('axios');
const CACHE = {};

module.exports = function searchHandler(request, h) {
  const phrase = request.query.phrase;
  const fullUrl = `https://prod--gateway.elifesciences.org/search?for=${phrase}`;

  if (CACHE[fullUrl]) {
    console.log(`[Cache] Fetching results for phrase search: "${phrase}"`);
    return CACHE[fullUrl];
  }

  console.log(`[API] Fetching results for phrase search: "${phrase}"`);

  return axios.get(fullUrl)
    .then(function (response) {
      const finalResponse = {
        error: null,
        info: {
          requestProcessingMs: 324,
          requestWaitingMs: 324,
        },
        data: {
          total: response.data.total,
          results: response.data.items,
          aggs: {
            types: response.data.types,
            subjects: response.data.subjects,
          }
        },
      }

      finalResponse.data.results = finalResponse.data.results.map((res) => {
        res.url = `/journals/eLife/article/${res.id}/${res.title}`
        return res;
      })

      CACHE[fullUrl] = finalResponse;
      return finalResponse;
      // return { data: response.data };
    })
    .catch(function (error) {
      console.log(error);
      return { error: 'BFF had a problem resolving data from an external API' }
    });

}
