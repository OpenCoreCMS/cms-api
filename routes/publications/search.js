const PublicationsAdapter = require('./_adapters/autoselect');
const querystring = require('querystring');
const CACHE = {};

module.exports = function searchHandler(req, res) {
  const { phrase, pageNumber = 1, pageSize = 10, subjectId } = req.query;
  const searchParams = { phrase, pageNumber, pageSize, subjectId };

  const searchParamsString = querystring.stringify(searchParams);

  if (CACHE[searchParamsString]) {
    console.log(`[Cache] Fetching results for phrase search: "${phrase}"`);
    return res.json(CACHE[searchParamsString]);
  }

  console.log(`[API] Fetching results for phrase search: "${phrase}"`);

  return PublicationsAdapter.search(searchParams, (searchResultsErr, searchResults) => {
    CACHE[searchParamsString] = searchResults;
    return res.json(searchResults);
  });
}
