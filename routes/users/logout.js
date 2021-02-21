function userLogoutHandler(req, res) {
  req.session = { authenticated: false, lastAction: 'logout' };
  req.session.save(() => {
    return res.json({ error: null, data: true });
  });
}

module.exports = userLogoutHandler;
