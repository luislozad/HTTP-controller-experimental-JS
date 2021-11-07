const http = require('./http');
const { respondText, respondJson, respondNotFound } = require('./service');

http.get('/', (req, res) => {
	return respondText(req, res);
});

http.get('/json', (req, res) => {
	return respondJson(req, res);
});

http.get('*', (req, res) => {
	return respondNotFound(req, res);
});