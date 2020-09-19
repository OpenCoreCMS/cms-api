const _ = require('lodash');
const MongoLib = require('../../lib/mongo');
const EncryptionLib = require('../../lib/encryption');

async function userLoginHandler(request, h) {
  return new Promise(resolve => {
    const payload = request.payload;

    if (!payload || !payload.email || !payload.password) {
      return resolve({ error: 'Invalid credentials.' });
    }

    return MongoLib.users.find({ email: payload.email }, (userErr, userData) => {
      const pwdSalt = _.get(userData, '0.pwdSalt');
      const pwdHash = _.get(userData, '0.pwdHash');

      if (userErr || !pwdSalt || !pwdHash) {
        return resolve({ error: 'Invalid credentials.' });
      }

      const encryptedPass = EncryptionLib.encryptPhrase(payload.password, pwdSalt);

      if (encryptedPass !== pwdHash) {
        return resolve({ error: 'Invalid credentials.' });
      }

      // store in session
      const cleanUserData = {
        authenticated: true,
        email: userData[0].email,
        firstname: userData[0].firstname,
        lastname: userData[0].lastname
      }

      h.state('OPP_Session', cleanUserData);
      resolve({ data: true });
    });
  });
}

module.exports = userLoginHandler;
