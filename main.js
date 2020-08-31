'use strict';

const Hapi = require('@hapi/hapi');

const mockUsers = require('./data/users');
const mockArticles = require('./data/articles');
const mockJournals = require('./data/journals');

const TTL_1M = 60000;
const TTL_1H = 60 * TTL_1M;

// Create a server with a host and port
const server = Hapi.server({
	host: 'localhost',
	port: 4000
});

// server.state('OPP_SessionID', {
//     ttl: 24 * 60 * 60 * 1000, // One day
//     isSecure: false,
//     isHttpOnly: false,
// 		autoValue: async () => { return {} },
//     path: '/',
//     encoding: 'base64json'
// });


// Add the routes
server.route({
	method: 'GET',
	path: '/',
	handler: (request, h) => {
		return 'OK (OpenPublishingPlatform-Frontend-BFF 0.1.0)';
	}
});

server.route({
	method: 'GET',
	path: '/api/v1/users/getUsers',
	handler: (request, h) => {
		return { data: mockUsers };
	}
});

server.route({
	method: 'GET',
	path: '/api/v1/pages/getPage/{pageId}',
	handler: require('./routes/pages/getPage/[pageId]')
});

server.route({
	method: 'GET',
	path: '/api/v1/journals/getJournals',
	options: {cache: { expiresIn: TTL_1M }},
	handler: (request, h) => {
		return { data: mockJournals };
	}
});

server.route({
	method: 'GET',
	path: '/api/v1/journals/getArticles',
	options: {cache: { expiresIn: TTL_1M }},
	handler: (request, h) => {
		return { data: mockArticles };
	}
});

server.route({
	method: 'GET',
	path: '/api/v1/search',
	options: {cache: { expiresIn: TTL_1H }},
	handler: require('./routes/search')
});



// server.route({
//     path: '/album/{album}/{song?}',
//     method: 'GET',
//     handler: function getAlbum(request, h) {
// 	    return 'You asked for ' +
// 	        (request.params.song ? request.params.song + ' from ' : '') +
// 	        request.params.album;
// 		}
// });
//
//
// server.route({
//     path: '/session/set',
//     method: 'GET',
//     handler: function (request, h) {
// 	    // let session = JSON.parse(request.state.OPP_SessionID) || {};
// 	    let session = request.state.OPP_SessionID || {};
//
// 			session.user = 'joe';
// 	    session.last = Date.now();
//
// 	    // return h.response('Success').state('OPP_SessionID', JSON.stringify(session));
// 	    return h.response('Success').state('OPP_SessionID', session);
// 		}
// });
//
// server.route({
//     path: '/session/get',
//     method: 'GET',
//     handler: function (request, h) {
// 	    // let session = JSON.parse(request.state.OPP_SessionID) || {};
// 	    let session = request.state.OPP_SessionID || {};
//
// 	    return session;
// 		}
// });


// Start the server
async function startServer() {
	// try {
	// 	await server.start();
	// } catch (err) {
	// 	console.log(err);
	// 	process.exit(1);
	// }
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
