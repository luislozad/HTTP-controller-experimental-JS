const http = require('http');
const { onCreateServer } = require('./core/controller');

const PORT = process.env.PORT || 9000;

const options = [PORT, logger];

const server = http.createServer(onCreateServer);

server.listen(...options);

function logger() {
	console.log(`Server listening on port ${PORT}`);
}