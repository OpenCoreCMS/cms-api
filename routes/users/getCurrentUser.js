function getCurrentUserHandler(req, res) {
  const fallbackValue = { authenticated: false, fallbackValueSource: 'GetCurrentUserHandler' };
  return res.json({ data: req.session.user || fallbackValue });
}

module.exports = getCurrentUserHandler;
