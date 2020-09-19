'use strict';

const Hapi = require('@hapi/hapi');

const TTL_1M = 60 * 1000;
const TTL_1H = 60 * TTL_1M;
const TTL_1D = 24 * TTL_1H;

const server = Hapi.server({ host: 'localhost', port: 4000 });

server.state('OPP_Session', {
  ttl: 7 * TTL_1D,
  isSecure: false,
  isHttpOnly: false,
  path: '/',
  autoValue: async () => { return { authenticated: false, fallbackValueSource: 'CookieConfig' } },
  encoding: 'base64json'
});

/**
 * Base route
 * Returns a basic 200 OK response
 */
server.route({
  method: 'GET', path: '/',
  handler: (request, h) => {
    return 'OK \n<br/>// Open Publishing Platform - BFF 0.1.0\n<br/>// See /api/v1/docs';
  }
});

/**
 * Docs route
 * Returns a basic 200 OK response
 */
server.route({
  method: 'GET', path: '/api/v1/docs',
  handler: require('./routes/docs')
});

server.route({
  method: 'GET', path: '/api/v1/docs/test',
  handler: require('./routes/docs/test')
});

/**
 * Pages routes
 */
server.route({
  method: 'GET', path: '/api/v1/pages/getPage/{pageId}',
  handler: require('./routes/pages/getPage/[pageId]')
});

/**
 * Settings routes
 */
server.route({
  method: 'GET', path: '/api/v1/settings/getSettingValue/{settingName}',
  handler: require('./routes/settings/getSettingValue/[settingName]')
});

/**
 * Users routes
 */
server.route({
  method: 'GET', path: '/api/v1/users/getCurrentUser',
  handler: require('./routes/users/getCurrentUser')
});

server.route({
  method: 'POST', path: '/api/v1/users/login',
  handler: require('./routes/users/login')
});

server.route({
  method: 'GET', path: '/api/v1/users/logout',
  handler: require('./routes/users/logout')
});

/**
 * Publications routes
 */
// search
server.route({
  method: 'GET', path: '/api/v1/publications/search',
  // options: { cache: { expiresIn: TTL_1H } },
  handler: require('./routes/publications/search')
});

// subjects
server.route({
  method: 'GET', path: '/api/v1/publications/subjects/getAllSubjects',
  // options: { cache: { expiresIn: TTL_1H } },
  handler: require('./routes/publications/subjects/getAllSubjects')
});

server.route({
  method: 'GET', path: '/api/v1/publications/subjects/{subjectId}/getOneSubject',
  // options: { cache: { expiresIn: TTL_1H } },
  handler: require('./routes/publications/subjects/[subjectId]/getOneSubject')
});

// journals
server.route({
  method: 'GET', path: '/api/v1/publications/journals/getAllJournals',
  // options: { cache: { expiresIn: TTL_1H } },
  handler: require('./routes/publications/journals/getAllJournals')
});

server.route({
  method: 'GET', path: '/api/v1/publications/journals/{journalId}/getJournal',
  // options: { cache: { expiresIn: TTL_1H } },
  handler: require('./routes/publications/journals/[journalId]/getJournal')
});

server.route({
  method: 'GET', path: '/api/v1/publications/journals/{journalId}/getCurrentIssue',
  handler: require('./routes/publications/journals/[journalId]/getCurrentIssue')
});

server.route({
  method: 'GET', path: '/api/v1/publications/journals/articles/{articleId}/getArticle',
  // options: { cache: { expiresIn: TTL_1H } },
  handler: require('./routes/publications/journals/articles/[articleId]/getArticle')
});

/**
 * Start the server
 */
async function startServer() {
  await server.start();
  console.log('Server running at:', server.info.uri);
}

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

server.events.on({ name: 'request', channels: 'internal' }, (request, event, tags) => {
  if (tags.error && tags.state) {
    console.error(event);
  }
});

startServer();
