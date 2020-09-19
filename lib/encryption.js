const crypto = require('crypto');

const ITERATIONS = 10000;
const SALT_SIZE = 64;

function generateSalt() {
  return crypto.randomBytes(SALT_SIZE).toString('hex');
}

function encryptPhrase(phrase, salt) {
  const encrypted = crypto.pbkdf2Sync(phrase, salt, ITERATIONS, SALT_SIZE, 'sha512').toString('base64');
  return encrypted;
}

const EncryptionLib = {
  generateSalt,
  encryptPhrase,
}

module.exports = EncryptionLib;
