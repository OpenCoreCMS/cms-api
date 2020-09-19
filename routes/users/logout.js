async function userLogoutHandler(request, h) {
  h.state('OPP_Session', { authenticated: false });
  return { error: null, data: true };
}

module.exports = userLogoutHandler;
