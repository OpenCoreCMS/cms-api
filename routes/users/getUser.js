const MongoLib = require('../../lib/mongo');

async function getOneUserHandler(request, h) {
  return new Promise(resolve => {
    const userId = request.params.userId;

    if (!userId || !userId.length) {
      return resolve({ error: 'Invalid userId provided.' });
    }

    return MongoLib.users.getById(userId, (userErr, userData) => {
      resolve({ data: userData });
    });
  });
}

module.exports = getOneUserHandler;
