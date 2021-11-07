require('./routing');

const { routers } = require('./http');
const { normalizeRoute:routeFix } = require('./helper');

exports.onCreateServer = function (req, res) {
	const getRoute = (item) => item.route == req.url || routeFix(item.route) == req.url;
	const getRouteNotFound = (item) => item.route == '*' || item.route == '/*';

	const routeDef = routers.get.find(getRoute);
	const routeDefNotFound = routers.get.find(getRouteNotFound);

	if (routeDef) {
		routeDef.handler(req, res);
	} else if (routeDefNotFound) {
		routeDefNotFound.handler(req, res);
	} else {
		routeControllerDefault(req, res);
	}
}

function routeControllerDefault(req, res) {
	res.writeHead(404, { 'Content-Type': 'text/plain' });
	res.end('Not Found and Not defined');
}