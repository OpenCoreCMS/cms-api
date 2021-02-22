'use strict';

const express = require('express');
const session = require('express-session');
const config = require('./lib/config');

const TTL_1M = 60 * 1000;
const TTL_1H = 60 * TTL_1M;
const TTL_1D = 24 * TTL_1H;

const app = express();
app.set('trust proxy', 1);
app.use(session({
  name: 'OCC_SID',
  secret: 'TotallyUnguessableSecretHere',
  resave: true,
  saveUninitialized: true,
  cookie: {
    // secure: true,
    // rolling: true,
    // httpOnly: false,
    // path: '/',
    maxAge: TTL_1D
  }
}));


/**
 * Base route
 * Returns a basic 200 OK response
 */
app.get('/', function rootRouteGetMethod (req, res) {
  return res.send('OK \n<br/>// OpenCoreCMS - API 0.1.0\n<br/>// See /api/v1/docs');
});

/**
 * Docs route
 * Returns a basic 200 OK response
 */
app.get('/api/v1/docs', require('./routes/docs'));
app.get('/api/v1/docs/test', require('./routes/docs/test'));

/**
 * Pages routes
 */
app.get('/api/v1/pages/getPage/:pageId', require('./routes/pages/getPage/[pageId]'));

/**
 * Settings routes
 */
app.get('/api/v1/settings/getSettingValue/:settingName', require('./routes/settings/getSettingValue/[settingName]'));

/**
 * Users routes
 */
app.get('/api/v1/users/getCurrentUser', require('./routes/users/getCurrentUser'));
app.post('/api/v1/users/login', require('./routes/users/login'));
app.get('/api/v1/users/logout', require('./routes/users/logout'));

// /**
//  * Publications routes
//  */
// // search
// server.route({
//   method: 'GET', path: '/api/v1/publications/search',
//   // options: { cache: { expiresIn: TTL_1H } },
//   handler: require('./routes/publications/search')
// });
//
// // subjects
// server.route({
//   method: 'GET', path: '/api/v1/publications/subjects/getAllSubjects',
//   // options: { cache: { expiresIn: TTL_1H } },
//   handler: require('./routes/publications/subjects/getAllSubjects')
// });
//
// server.route({
//   method: 'GET', path: '/api/v1/publications/subjects/{subjectId}/getOneSubject',
//   // options: { cache: { expiresIn: TTL_1H } },
//   handler: require('./routes/publications/subjects/[subjectId]/getOneSubject')
// });
//
// // journals
// server.route({
//   method: 'GET', path: '/api/v1/publications/journals/getAllJournals',
//   // options: { cache: { expiresIn: TTL_1H } },
//   handler: require('./routes/publications/journals/getAllJournals')
// });
//
// server.route({
//   method: 'GET', path: '/api/v1/publications/journals/{journalId}/getJournal',
//   // options: { cache: { expiresIn: TTL_1H } },
//   handler: require('./routes/publications/journals/[journalId]/getJournal')
// });
//
// server.route({
//   method: 'GET', path: '/api/v1/publications/journals/{journalId}/getCurrentIssue',
//   handler: require('./routes/publications/journals/[journalId]/getCurrentIssue')
// });
//
// server.route({
//   method: 'GET', path: '/api/v1/publications/journals/articles/{articleId}/getArticle',
//   // options: { cache: { expiresIn: TTL_1H } },
//   handler: require('./routes/publications/journals/articles/[articleId]/getArticle')
// });

/**
 * Start the server
 */
function startServer() {
  return app.listen(config.appPort, (argzzz) => {
    // console.log('Server running at:', server.info.uri);
    console.log('Server running at:', config.appPort);
    console.log(argzzz);
  });
}

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

// server.events.on({ name: 'request', channels: 'internal' }, (request, event, tags) => {
//   if (tags.error && tags.state) {
//     console.error(event);
//   }
// });

startServer();
