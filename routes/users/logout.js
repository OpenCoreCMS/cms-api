function userLogoutHandler(req, res) {
  req.session.user = { authenticated: false, lastAction: 'logout' };
  req.session.save((err) => {
    return res.json({ error: null, data: true });
  });
}

module.exports = userLogoutHandler;
