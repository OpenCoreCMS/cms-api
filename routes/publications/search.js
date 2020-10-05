const PublicationsAdapter = require('./_adapters/autoselect');
const querystring = require('querystring');
const CACHE = {};

module.exports = async function searchHandler(request, h) {
  const { phrase, pageNumber = 1, pageSize = 10, subjectId } = request.query;
  const searchParams = { phrase, pageNumber, pageSize, subjectId };

  const searchParamsString = querystring.stringify(searchParams);

  if (CACHE[searchParamsString]) {
    console.log(`[Cache] Fetching results for phrase search: "${phrase}"`);
    return CACHE[searchParamsString];
  }

  console.log(`[API] Fetching results for phrase search: "${phrase}"`);

  const searchResults = await PublicationsAdapter.search(searchParams);
  CACHE[searchParamsString] = searchResults;
  return searchResults;
}
