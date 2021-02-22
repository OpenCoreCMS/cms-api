const encryptionLib = require('../../../lib/encryption');
// const _ = require('lodash');
// const MongoLib = require('../../../lib/mongo');

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})



function generateUserRecord(username, password) {
  const userData = {
    email: '',
    firstname: '',
    lastname: '',
    pwdHash: '',
    pwdSalt: '',
    dateCreated: (new Date()).toISOString(),
    dateLastActivity: (new Date()).toISOString(),
    userGroup: 1,
  };

  return readline.question(`User email? `, (email) => {
    userData.email = email;

    return readline.question(`Password? `, (password) => {
      // encryption salt + hash
      const newSalt = encryptionLib.generateSalt();
      const newHash = encryptionLib.encryptPhrase(password, newSalt);

      userData.pwdSalt = newSalt;
      userData.pwdHash = newHash;

      readline.close();
      console.log(userData);
      return userData;
    });
  });
}


generateUserRecord();


// function insertData(data, collection, key, callback) {
//   MongoLib[collection].find({}, (err, existingResults) => {
//     const missingItems = _.differenceBy(data, existingResults, key);
//     if (!missingItems.length) {
//       console.log(`All required items exist in collection "${collection}"`);
//       return callback();
//     }
//
//     MongoLib[collection].insertMany(missingItems, (err, data) => {
//       if (err) {
//         console.log('Error:', err);
//         return callback(err);
//       }
//
//       console.log(`Inserted ${missingItems.length} missing items into collection "${collection}": ${_.map(missingItems, 'key').join(', ')}`);
//       return callback();
//     });
//   });
// }
