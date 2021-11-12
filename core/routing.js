const http = require('./http');
const { 
	respondText, 
	respondJson, 
	respondNotFound, 
	respondEcho,
	respondStatic
} = require('./service');

http.get('/', (props) => {
	return respondText(props);
});

http.get('/json', (props) => {
	return respondJson(props);
});

http.get('/echo?input=(:input)', (props) => {
	return respondEcho(props);
});

http.get('*', (props) => {
	return respondNotFound(props);
});

http.get('/static/*', (props) => {
	return respondStatic(props);
});