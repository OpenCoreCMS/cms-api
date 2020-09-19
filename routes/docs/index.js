const markup = `
<html>
<body>

<h1>Endpoints - OPP BFF 0.1.0</h1>
<ul>
  <li>/api/v1/pages/getPage/{pageId}</li>
  <li>/api/v1/publications/search</li>
  <li>/api/v1/publications/journals/getAllJournals</li>
  <li>/api/v1/publications/journals/{journalId}/getJournal</li>
  <li>/api/v1/publications/journals/{journalId}/getCurrentIssue</li>
  <li>/api/v1/publications/journals/articles/{articleId}/getArticle</li>
</ul>

</body>
</html>
`;


function docsPageHandler(request, h) {
  return markup;
}

module.exports = docsPageHandler;
