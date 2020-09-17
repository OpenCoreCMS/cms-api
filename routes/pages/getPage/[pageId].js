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


async function getPageHandler(request, h) {
  return new Promise(resolve => {
    const pagePath = request.params.pageId;
    // console.log('>> pagePath:', pagePath)

    if (!pagePath || !pagePath.length || !pagePath.startsWith('/')) {
      return resolve({ error: 'Invalid pagePath provided. pagePath must be URL escaped and start with a slash.' });
    }

    return MongoLib.pages.find({ url: pagePath}, (pageErr, pageData) => {
      const finalPageData = buildPageDataObject(pageData[0]);
      resolve({ data: finalPageData });
    });
  });
}

module.exports = getPageHandler;
