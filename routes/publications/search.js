const axios = require('axios');
const CACHE = {};

// https://prod--gateway.elifesciences.org/search
//         ?for=covid
//
//         &page=4
//         &per-page=10
//
//         &sort=relevance
//         &order=desc
//
//         &subject[]=cell-biology
//
//         &start-date=2010-01-01
//         &end-date=2020-12-31


module.exports = function searchHandler(request, h) {
  const { phrase, pageNumber = 1, pageSize = 10 } = request.query;

  let fullUrl = `https://prod--gateway.elifesciences.org/search?`;
  if (phrase) {
    fullUrl += `for=${phrase}&`;
  }
  if (pageNumber) {
    fullUrl += `page=${pageNumber}&`;
  }
  if (pageSize) {
    fullUrl += `per-page=${pageSize}&`;
  }

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
          pages: {
            pageNumber: pageNumber,
            pageSize: pageSize,
            totalPages: Math.ceil(response.data.total / pageSize),
          },
          query: {
            phrase,
            // filters
          },
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