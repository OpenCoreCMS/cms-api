function pages_GetPage_PageId_handler(request, h) {
  const pageId = request.params.pageId;
  console.log(`Serving page: ${pageId}`);

  if (pageId.includes('favicon')) {
    return {};
  }

  if (!pageId || !pageId.length) {
    return { error: 'pageId must be provided'};
  }

  try {
    let pageData = require(`../../../data/pages/${pageId}`);
    return { data: pageData };
  } catch (err) {
    // console.log(err);
    console.log(`ERR Page "${pageId}" not found`)
    return { data: { error: 'Page not found', statusCode: 404 }};
  }

}

module.exports = pages_GetPage_PageId_handler;
