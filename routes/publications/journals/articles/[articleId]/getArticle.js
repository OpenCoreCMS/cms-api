const PublicationsAdapter = require('../../../_adapters/autoselect');
const config = require('../../../../../lib/config');
const BYPASS_CACHE = config.bypassCache;
const CACHE = {};

module.exports = function getArticleHandler(req, res) {
  const articleId = req.params.articleId;

  if (!BYPASS_CACHE && CACHE[articleId]) {
    console.log(`[Cache] Fetching article: ${articleId}`);
    return res.json(CACHE[articleId]);
  }

  console.log(`[API] Fetching article: ${articleId}`);

  return PublicationsAdapter.getOneArticle(articleId, (searchError, searchResults) => {
    if (!BYPASS_CACHE) {
      CACHE[articleId] = searchResults;
    }
    return res.json(searchResults);
  });
}
