'use strict';

const Hapi = require('@hapi/hapi');

const TTL_1M = 60000;
const TTL_1H = 60 * TTL_1M;

const server = Hapi.server({ host: 'localhost', port: 4000 });

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

// /api/v1/docs
server.route({
	method: 'GET', path: '/api/v1/docs',
	handler: require('./routes/docs')
});

// /api/v1/pages routes
server.route({
	method: 'GET', path: '/api/v1/pages/getPage/{pageId}',
	handler: require('./routes/pages/getPage/[pageId]')
});

// /api/v1/search routes
server.route({
	method: 'GET', path: '/api/v1/publications/search',
	options: { cache: { expiresIn: TTL_1H } },
	handler: require('./routes/publications/search')
});

// /api/v1/journals routes
server.route({
	method: 'GET', path: '/api/v1/publications/journals/getAllJournals',
	options: { cache: { expiresIn: TTL_1H } },
	handler: require('./routes/publications/journals/getAllJournals')
});

server.route({
	method: 'GET', path: '/api/v1/publications/journals/{journalId}/getJournal',
  options: { cache: { expiresIn: TTL_1H } },
	handler: require('./routes/publications/journals/[journalId]/getJournal')
});

server.route({
  method: 'GET', path: '/api/v1/publications/journals/{journalId}/getCurrentIssue',
  handler: require('./routes/publications/journals/[journalId]/getCurrentIssue')
});

server.route({
	method: 'GET', path: '/api/v1/publications/journals/articles/{articleId}/getArticle',
  options: { cache: { expiresIn: TTL_1H } },
	handler: require('./routes/publications/journals/articles/[articleId]/getArticle')
});

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
