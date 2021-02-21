function getCurrentUserHandler(req, res) {
  const fallbackValue = { authenticated: false, fallbackValueSource: 'GetCurrentUserHandler' };
  return res.json({ data: req.session || fallbackValue });
}

module.exports = getCurrentUserHandler;
