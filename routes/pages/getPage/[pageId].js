function getPageHandler(request, h) {
  const pagePath = request.params.pageId;

  if (!pagePath || !pagePath.length || !pagePath.startsWith('/')) {
    return { error: 'Invalid pagePath provided. pagePath must be URL escaped and start with a slash.' };
  }

  console.log(`[API] Retrieving page: ${pagePath}`);

  const systemPageData = {
    breadcrumbs: [
      { url: '/', name: 'Home' },
      { url: pagePath, name: 'Dynamic page' }
    ],
    url: pagePath
  };

  try {
    let dynamicPageData = require(`../../../data/pages${pagePath}`);

    const finalPageData = Object.assign({}, dynamicPageData, systemPageData);

    return { data: finalPageData };
  } catch (err) {
    console.log(err);
    console.log(`ERR Page "${pagePath}" not found`)
    return { data: { error: 'Page not found', statusCode: 404 }};
  }

}

module.exports = getPageHandler;
