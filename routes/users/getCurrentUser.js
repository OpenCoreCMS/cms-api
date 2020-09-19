async function getCurrentUserHandler(request, h) {
  const OPP_Session = request.state.OPP_Session;

  return new Promise(resolve => {
    resolve({ data: OPP_Session })
  });
}

module.exports = getCurrentUserHandler;
