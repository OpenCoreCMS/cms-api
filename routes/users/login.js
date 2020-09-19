const MongoLib = require('../../lib/mongo');
const EncryptionLib = require('../../lib/encryption');

async function getOneUserHandler(request, h) {
  return new Promise(resolve => {
    const payload = request.payload;

    if (!payload || !payload.email || !payload.password) {
      return resolve({ error: 'Invalid credentials.' });
    }

    return MongoLib.users.find({ email: payload.email }, (userErr, userData) => {
      if (userErr || !userData || !userData[0] || !userData[0].salt) {
        return resolve({ error: 'Invalid credentials.' });
      }

      const userObj = userData[0];
      const encryptedPass = EncryptionLib.encryptPhrase(payload.password, userObj.salt);

      if (encryptedPass !== userObj.password) {
        return resolve({ error: 'Invalid credentials.' });
      }

      resolve({ data: userData });
    });
  });
}

module.exports = getOneUserHandler;
