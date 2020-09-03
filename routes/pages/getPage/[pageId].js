function fetchDynamicPageData(pagePath) {
  let rtn;

  try {
    rtn = require(`../../../data/pages${pagePath}`);
    console.log(`[API] OK Page retrieved: ${pagePath}`);
  } catch (err) {
    console.log(`[API] ERR Page not found: ${pagePath}`)
    rtn = { error: 'Page not found', statusCode: 404 }
  }

  return rtn;
}

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


function getPageHandler(request, h) {
  const pagePath = request.params.pageId;
  // console.log('>> pagePath:', pagePath)

  if (!pagePath || !pagePath.length || !pagePath.startsWith('/')) {
    return { error: 'Invalid pagePath provided. pagePath must be URL escaped and start with a slash.' };
  }

  const dynamicPageData = fetchDynamicPageData(pagePath);
  const finalPageData = buildPageDataObject(dynamicPageData);
  return { data: finalPageData };
  // return { data: { error: 'Page not found', statusCode: 404 }};
}

module.exports = getPageHandler;
