const _ = require('lodash');
const debug = require('debug');
const MongoLib = require('../../lib/mongo');
const EncryptionLib = require('../../lib/encryption');

async function userLoginHandler(req, res) {
  const payload = req.body;
  let failReason = null;

  if (!payload || !payload.email || !payload.password) {
    failReason = 'OCC_ERR_USER_CREDENTIALS_INCOMPLETE';
    debug('opencorecms:api:error')(`Authentication failed. Reason: ${failReason}.`);
    return res.json({ error: 'Invalid credentials.' });
  }

  return MongoLib.users.find({ email: payload.email }, (userErr, userData) => {
    const pwdSalt = _.get(userData, '0.pwdSalt');
    const pwdHash = _.get(userData, '0.pwdHash');

    if (userErr || !pwdSalt || !pwdHash) {
      failReason = 'OCC_ERR_USER_NOT_FOUND';
      debug('opencorecms:api:error')(`Authentication failed. User: "${payload.email}". Reason: ${failReason}.`);
      return res.json({ error: 'Invalid credentials.' });
    }

    const encryptedPass = EncryptionLib.encryptPhrase(payload.password, pwdSalt);

    if (encryptedPass !== pwdHash) {
      failReason = 'OCC_ERR_USER_WRONG_CREDENTIALS';
      debug('opencorecms:api:error')(`Authentication failed. User: "${payload.email}". Reason: ${failReason}.`);
      return res.json({ error: 'Invalid credentials.' });
    }

    // store in session
    const cleanUserData = {
      authenticated: true,
      lastAction: 'login',
      email: userData[0].email,
      firstname: userData[0].firstname,
      lastname: userData[0].lastname
    }

    req.session.user = cleanUserData;
    return req.session.save((err) => {
      return res.json({ data: cleanUserData });
    })
  });
}

module.exports = userLoginHandler;
