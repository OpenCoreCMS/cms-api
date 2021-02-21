const MongoLib = require('../../../lib/mongo');

function buildPageDataObject(pageRecord) {
  const pagePath = '/home';

  const systemPageData = {
    breadcrumbs: [
      { url: '/', name: 'Home' },
      { url: pagePath, name: 'Dynamic page' }
    ],
    url: pagePath
  };

  const finalPageData = Object.assign({}, pageRecord, systemPageData);
  return finalPageData;
}


function getPageHandler(req, res) {
  const pagePath = req.params.pageId;
  console.log('>> pagePath:', pagePath)

  if (!pagePath || !pagePath.length || !pagePath.startsWith('/')) {
    return res.json({ error: 'Invalid pagePath provided. pagePath must be URL escaped and start with a forward slash (example: %2Ftest)' });
  }

  return MongoLib.pages.find({ url: pagePath}, (pageErr, pageData) => {
    const finalPageData = buildPageDataObject(pageData[0]);
    return res.json({ data: finalPageData });
  });
}

module.exports = getPageHandler;
