exports.respondText = function ({ req, res }) {
	res.setHeader('Content-Type', 'text/plain');
	res.end('hi');
}

exports.respondJson = function ({ req, res }) {
	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify({ text: 'hi', numbers: [1, 2, 3, 4] }));
}

exports.respondNotFound = function ({ req, res }) {
	res.writeHead(404, { 'Content-Type': 'text/plain' });
	res.end('Not Found');
}

exports.respondEcho = function ({ params, req, res }) {
	res.setHeader('Content-Type', 'text/plain');
	res.end('hi ' + params.value);
}