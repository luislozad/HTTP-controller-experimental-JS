const http = require('./http');
const { respondText, respondJson, respondNotFound, respondEcho } = require('./service');

http.get('/', (props) => {
	return respondText(props);
});

http.get('/json', (props) => {
	return respondJson(props);
});

http.get('/echo?input=:value', (props) => {
	return respondEcho(props);
});

http.get('*', (props) => {
	return respondNotFound(props);
});