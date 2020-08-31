const axios = require('axios');
module.exports = function searchHandler(request, h) {
  const phrase = request.query.phrase;
  console.log(`Searching for phrase: ${phrase}`);

  const fullUrl = `https://prod--gateway.elifesciences.org/search?for=${phrase}`;
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
        data: {
          total: fullData.total,
          results: fullData.items,
          aggs: {
            types: fullData.types,
            subjects: fullData.subjects,
          }
        }
      };
    });
}
