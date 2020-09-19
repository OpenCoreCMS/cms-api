async function userLogoutHandler(request, h) {
  h.state('OPP_Session', { authenticated: false, lastAction: 'logout' });
  return { error: null, data: true };
}

module.exports = userLogoutHandler;
