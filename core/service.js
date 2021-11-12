const path = require('path');
const fs = require('fs');

exports.respondText = function ({ req, res }) {
	res.setHeader('Content-Type', 'text/plain');
	res.end('hi');
}

exports.respondJson = function ({ req, res }) {
	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify({ text: 'hi', numbers: [1, 2, 3, 4] }));
}

function respondNotFound({ req, res }) {
	res.writeHead(404, { 'Content-Type': 'text/plain' });
	res.end('Not Found');
}

exports.respondNotFound = respondNotFound;

exports.respondEcho = function ({ params, req, res }) {
	const { input = '' } = params;
	res.setHeader('Content-Type', 'application/json');
	res.end(
		JSON.stringify({
		  normal: input,
		  shouty: input.toUpperCase(),
		  characterCount: input.length,
		  backwards: input
		    .split('')
		    .reverse()
		    .join('')
		})
	);
}

exports.respondStatic = function ({ params, req, res }) {
	const filename = path.resolve(__dirname, '../public');
  	fs.createReadStream(filename + req.url)
    	.on('error', () => respondNotFound({req, res}))
    	.pipe(res);
}