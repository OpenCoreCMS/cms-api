'use strict';

const Hapi = require('@hapi/hapi');

const TTL_1M = 60000;
const TTL_1H = 60 * TTL_1M;

const server = Hapi.server({ host: 'localhost', port: 4000 });

server.route({
	method: 'GET', path: '/',
	handler: (request, h) => {
		return 'OK (OpenPublishingPlatform-Frontend-BFF 0.1.0)';
	}
});

server.route({
	method: 'GET', path: '/api/v1/users/getUsers',
  handler: require('./routes/users/getUsers')
});

server.route({
	method: 'GET', path: '/api/v1/pages/getPage/{pageId}',
	handler: require('./routes/pages/getPage/[pageId]')
});

server.route({
	method: 'GET', path: '/api/v1/journals/getAllJournals',
	options: { cache: { expiresIn: TTL_1M } },
	handler: require('./routes/journals/getAllJournals')
});

server.route({
	method: 'GET', path: '/api/v1/journals/{journalId}/getArticles',
	handler: require('./routes/journals/[journalId]/getArticles')
});

server.route({
	method: 'GET', path: '/api/v1/articles/getArticle/{articleId}',
	handler: require('./routes/articles/getArticle/[articleId]')
});

server.route({
	method: 'GET', path: '/api/v1/journals/{journalId}/getJournal',
	handler: require('./routes/journals/[journalId]/getJournal')
});

server.route({
	method: 'GET', path: '/api/v1/search',
	options: { cache: { expiresIn: TTL_1H } },
	handler: require('./routes/search')
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
