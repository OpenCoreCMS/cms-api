const markup = `
<html>
<body>

<h1>Endpoints - OpenCoreCMS API 0.1.0</h1>
<ul>
  <li>${generateLink('/api/v1/users/getCurrentUser')}</li>
  <li>${generateLink('/api/v1/users/login[post]')}</li>
  <li>${generateLink('/api/v1/users/logout')}</li>

  <li>${generateLink('/api/v1/settings/getSettingValue/$SETTING_NAME')}</li>

  <li>${generateLink('/api/v1/pages/getPage/$PAGE_ID')}</li>

  <li>${generateLink('/api/v1/publications/search')}</li>
  <li>${generateLink('/api/v1/publications/journals/getAllJournals')}</li>
  <li>${generateLink('/api/v1/publications/journals/$JOURNAL_ID/getJournal')}</li>
  <li>${generateLink('/api/v1/publications/journals/$JOURNAL_ID/getCurrentIssue')}</li>
  <li>${generateLink('/api/v1/publications/journals/articles/$ARTICLE_ID/getArticle')}</li>
</ul>

</body>
</html>
`;

function generateLink(link) {
  return `<a href="${link}">${link}</a>`;
}

function docsPageHandler(req, res) {
  return res.send(markup);
}

module.exports = docsPageHandler;
