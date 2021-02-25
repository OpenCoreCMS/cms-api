'use strict';

/**
 * Open Core CMS API
 * Alpha build v0.1.0
 */

// ./lib/config needs to be the first import, it contains DEBUG env var defaults
const config = require('./lib/config');
const debug = require('debug');
const express = require('express');
const expressSession = require('express-session');
const expressBodyParser = require('body-parser')

const TTL_1M = 60 * 1000;
const TTL_1H = 60 * TTL_1M;
const TTL_1D = 24 * TTL_1H;

const app = express();
app.set('trust proxy', 1);
app.use(expressSession({
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

// parse application/x-www-form-urlencoded
app.use(expressBodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(expressBodyParser.json());

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

/**
 * Publications routes
 */
// search
app.get('/api/v1/publications/search', require('./routes/publications/search'));

// subjects
app.get('/api/v1/publications/subjects/getAllSubjects', require('./routes/publications/subjects/getAllSubjects'));

app.get('/api/v1/publications/subjects/:subjectId/getOneSubject',require('./routes/publications/subjects/[subjectId]/getOneSubject'));

// journals
app.get('/api/v1/publications/journals/getAllJournals', require('./routes/publications/journals/getAllJournals'));

app.get('/api/v1/publications/journals/:journalId/getJournal', require('./routes/publications/journals/[journalId]/getJournal'));

app.get('/api/v1/publications/journals/:journalId/getCurrentIssue', require('./routes/publications/journals/[journalId]/getCurrentIssue'));

app.get('/api/v1/publications/journals/articles/:articleId/getArticle', require('./routes/publications/journals/articles/[articleId]/getArticle'));

/**
 * Start the server
 */
function startServer() {
  app.use((err, _req, res, _next) => {
    debug('opencorecms:api:error')(err.stack);
    return res.sendStatus(500);
  });

  app.use((req, res) => {
    debug('opencorecms:api:error')(`Error 404 on URL: ${req.url}`);
    return res.sendStatus(404);
  });

  return app.listen(config.appPort, () => {
    const serverStartSuccessMessage = `Open Core CMS API is now running on port ${config.appPort}.`;
    console.log(serverStartSuccessMessage);
    debug('opencorecms:api:debug')(serverStartSuccessMessage);
  });
}

startServer();
