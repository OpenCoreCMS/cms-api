/**
 * Mongo adapter
 */
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const debug = require('debug');
const config = require('./config');

const mongoUrl = config.mongoUrl;
const mongoDbName = config.mongoDbName;
let mongoClient = null;

// eslint-disable-next-line
Object.defineProperty(RegExp.prototype, 'toJSON', { value: RegExp.prototype.toString });

/**
 * Creates a Mongo connection
 *
 * @param {function} callback Signature: (err, db)
 */
function getClient(callback) {
  if (mongoClient) {
    return callback(null, mongoClient);
  }

  return MongoClient.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err || !client) {
      debug('opp:bff-base:error')(`Couldn't connect to Mongo at ${mongoUrl}`);
      if (err) {
        debug('opp:bff-base:error')(err);
      }
      return callback(err);
    }

    debug('ops:bff-base:trace')('Connected to Mongo server');
    mongoClient = client;
    return callback(null, client);
  });
}

/**
 * Base model to instantiate a collection-specific model
 *
 * @param {string} collectionName A name of collection to use
 */
function Model(collectionName) {
  if (!mongoUrl) {
    return undefined;
  }

  if (typeof collectionName !== 'string' || !collectionName.length) {
    throw new Error('Collection name provided to base model needs to be a string.');
  }

  const rtnModelObject = {
    _type: 'mongo',
    insertOne: function insertOne(data, callback) {
      getClient((error, client) => {
        if (error) {
          debug('ops:bff-base:error')(error);
          return callback(error);
        }
        const db = client.db(mongoDbName);
        const col = db.collection(collectionName);

        return col.insertOne(data, (err, r) => callback(err, r));
      });
    },

    insertMany: function insertMany(data, callback) {
      getClient((error, client) => {
        if (error) {
          return callback(error);
        }
        const db = client.db(mongoDbName);
        const col = db.collection(collectionName);

        return col.insertMany(data, { multi: true }, (err, r) => callback(err, r));
      });
    },

    updateOne: function updateOne(whereQuery, data, callback) {
      getClient((error, client) => {
        if (error) {
          return callback(error);
        }
        const db = client.db(mongoDbName);
        const col = db.collection(collectionName);

        return col.updateOne(whereQuery, { $set: data }, { upsert: true }, (err, r) => {
          debug('ops:bff-base:error')(err);
          return callback(err, r);
        });
      });
    },

    getByID: function getByID(id, callback) {
      if (typeof id !== 'string' || id.length !== 24 || !ObjectID.isValid(id)) {
        return callback('Invalid ID parameter.');
      }

      return getClient((error, client) => {
        if (error) {
          return callback(error);
        }
        const db = client.db(mongoDbName);
        const col = db.collection(collectionName);

        return col.find({ _id: ObjectID(id) }).limit(1).toArray((err, reply) => {
          debug('ops:bff-base:error')(err);
          return callback(err, (reply && reply.length ? reply[0] : null));
        });
      });
    },

    find: function find(query, callback) {
      getClient((error, client) => {
        if (error) {
          return callback(error);
        }
        const db = client.db(mongoDbName);
        const col = db.collection(collectionName);

        return col.find(query).toArray((err, reply) => {
          if (err) {
            debug('ops:bff-base:error')(err);
            return callback(err);
          }

          debug('ops:bff-base:trace')(`Returning ${reply.length} results from ${collectionName}. Query: ${JSON.stringify(query, null, 0)}`);
          return callback(null, reply);
        });
      });
    },

    count: function count(query, callback) {
      getClient((error, client) => {
        if (error) {
          return callback(error);
        }
        const db = client.db(mongoDbName);
        const col = db.collection(collectionName);

        return col.countDocuments(query, (err, reply) => {
        // col.estimatedDocumentCount(query, (err, reply) => {
          return callback(err, reply);
        });
      });
    },

    deleteOne: function deleteOne(query, callback) {
      getClient((error, client) => {
        if (error) {
          return callback(error);
        }
        const db = client.db(mongoDbName);
        const col = db.collection(collectionName);

        return col.deleteOne(query, (err, reply) => {
          return callback(null, reply);
        });
      });
    },
  };

  return rtnModelObject;
}

const models = {
  pages: new Model('pages'),
  users: new Model('users'),
  journals: new Model('journals'),
  articles: new Model('articles'),
  apiAuth: new Model('apiAuth'),
  ObjectID,
};

module.exports = models;
