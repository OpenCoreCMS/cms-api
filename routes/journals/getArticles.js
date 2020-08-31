const mockArticles = require('../../data/articles');

module.exports = function getArticlesHandler(request, h) {
  const { phrase } = request.query;
  console.log(`Getting mock articles`);
  return { data: mockArticles };
}
