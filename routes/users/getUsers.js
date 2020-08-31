const mockUsers = require('../../data/users');

module.exports = function getUsersHandler(request, h) {
  // const { phrase } = request.query;
  console.log(`Getting mock users`);
  return { data: mockUsers };
}
