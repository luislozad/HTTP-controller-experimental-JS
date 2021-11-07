require('./routing');

const { routers } = require('./http');
const { getRoute } = require('./helper');

exports.onCreateServer = function (req, res) {
	const getRouteNotFound = ({ route }) => route == '*' || route == '/*';

	const { route, params } = getRoute(routers.get, req.url);
	const routeDefNotFound = routers.get.find(getRouteNotFound);

	if (route) {
		route.handler({ params, req, res });
	} else if (routeDefNotFound) {
		routeDefNotFound.handler({ params, req, res });
	} else {
		routeControllerDefault(req, res);
	}
}

function routeControllerDefault(req, res) {
	res.writeHead(404, { 'Content-Type': 'text/plain' });
	res.end('Not Found and Not defined');
}