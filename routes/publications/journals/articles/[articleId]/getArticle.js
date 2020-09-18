const PublicationsAdapter = require('../../../_adapters/autoselect');
const config = require('../../../../../lib/config');
const BYPASS_CACHE = config.bypassCache;
const CACHE = {};

module.exports = async function getArticleHandler(request, h) {
  const articleId = request.params.articleId;

  if (!BYPASS_CACHE && CACHE[articleId]) {
    console.log(`[Cache] Fetching article: ${articleId}`);
    return CACHE[articleId];
  }

  console.log(`[API] Fetching article: ${articleId}`);

  const searchResults = await PublicationsAdapter.getOneArticle(articleId);
  if (!BYPASS_CACHE) {
    CACHE[articleId] = searchResults;
  }
  return searchResults;
}
