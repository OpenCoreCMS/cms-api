const _ = require('lodash');
const MongoLib = require('../../lib/mongo');

const data = {
  pages: require('./data/pages'),
  journals: require('./data/journals'),
  articles: require('./data/articles'),
  users: require('./data/users'),
  subjects: require('./data/subjects')
};

function insertData(data, collection, key, callback) {
  MongoLib[collection].find({}, (err, existingResults) => {
    const missingItems = _.differenceBy(data, existingResults, key);
    if (!missingItems.length) {
      console.log(`All required items exist in collection "${collection}"`);
      return callback();
    }

    MongoLib[collection].insertMany(missingItems, (err, data) => {
      if (err) {
        console.log('Error:', err);
        return callback(err);
      }

      console.log(`Inserted ${missingItems.length} missing items into collection "${collection}": ${_.map(missingItems, 'key').join(', ')}`);
      return callback();
    });
  });
}

insertData(data.pages, 'pages', 'url', () => {
  insertData(data.journals, 'journals', 'id', () => {
    insertData(data.articles, 'articles', 'id', () => {
      insertData(data.subjects, 'subjects', 'id', () => {
        insertData(data.users, 'users', 'email', () => {
          console.log('Finished inserting seed data.')
          process.exit(0);
        });
      });
    });
  });
});
