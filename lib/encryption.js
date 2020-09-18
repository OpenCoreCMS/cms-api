const crypto = require('crypto');

function generateSalt() {
  return crypto.randomBytes(64).toString('hex');
}

function encryptPhrase(phrase, salt) {
  const encrypted = crypto.pbkdf2Sync(phrase, salt, 10000, 64, 'sha512').toString('base64');
  return encrypted;
}

const EncryptionLib = {
  generateSalt,
  encryptPhrase,
}

module.exports = EncryptionLib;
