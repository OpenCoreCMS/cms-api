const axios = require('axios');
const CACHE = {};

function sanitiseTitle(title) {
  const newTitle = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return newTitle;
}

module.exports = function searchHandler(request, h) {
  const journalId = request.params.journalId;
  const fullUrl = `https://prod--gateway.elifesciences.org/covers/current`;

  if (CACHE[journalId]) {
    console.log(`[Cache] Fetching results for current issue of journal: ${journalId}`);
    return CACHE[journalId];
  }

  console.log(`[API] Fetching results for current issue of journal: ${journalId}`);

  return axios.get(fullUrl)
    .then(function (response) {
      const results = response.data.items.map((res) => {
        const rtn = res.item;
        rtn.url = `/journals/eLife/article/${rtn.id}/${sanitiseTitle(rtn.title)}`
        rtn.img = res.image.source.uri;
        return rtn;
      });

      const finalResponse = {
        data: {
          total: response.data.total,
          results: results,
        },
      }

      CACHE[journalId] = finalResponse;
      return finalResponse;
      // return { data: response.data };
    })
    .catch(function (error) {
      console.log(error);
      return { error: 'BFF had a problem resolving data from an external API' }
    });

}
