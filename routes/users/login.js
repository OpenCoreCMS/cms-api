const _ = require('lodash');
const MongoLib = require('../../lib/mongo');
const EncryptionLib = require('../../lib/encryption');

async function userLoginHandler(req, res) {
  const payload = req.payload;

  if (!payload || !payload.email || !payload.password) {
    return res.json({ error: 'Invalid credentials.' });
  }

  return MongoLib.users.find({ email: payload.email }, (userErr, userData) => {
    const pwdSalt = _.get(userData, '0.pwdSalt');
    const pwdHash = _.get(userData, '0.pwdHash');

    if (userErr || !pwdSalt || !pwdHash) {
      return res.json({ error: 'Invalid credentials.' });
    }

    const encryptedPass = EncryptionLib.encryptPhrase(payload.password, pwdSalt);

    if (encryptedPass !== pwdHash) {
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
