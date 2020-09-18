const PublicationsAdapter = require('../../../_adapters/elife');
const CACHE = {};

module.exports = async function getArticleHandler(request, h) {
  const articleId = request.params.articleId;

  if (CACHE[articleId]) {
    console.log(`[Cache] Fetching article: ${articleId}`);
    return { data: CACHE[articleId] };
  }

  console.log(`[API] Fetching article: ${articleId}`);

  const searchResults = await PublicationsAdapter.getOneArticle(articleId);
  CACHE[articleId] = searchResults;
  return searchResults;
}
