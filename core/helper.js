const Route = require('route-parser');

function normalizeRoute(route) {
	let routes = route.split('/');
	routes = normalizeArray(routes);

	if (routes.length > 0) {
	    routes[0] = '/' + routes[0];

	    routes[routes.length - 1] = routes[routes.length - 1] + '/';

	    return routes.join('/');
	} else {
		return route;
	}
}

function normalizeReverseRoute(route) {
	let routes = route.split('/');
	routes = normalizeArray(routes);

	if (routes.length > 0) {
	    routes[0] = '/' + routes[0];

	    return routes.join('/');
	} else {
		return route;
	}

}

function normalizeArray(arr) {
	const newArray = arr.filter(r => r.length > 0);
	return newArray;
}

function getRoute(routes, url) {
	const routeCurrent = {
		route: null,
		params: null
	};

	for (let i = 0; i < routes.length; i++) {
		const route = routes[i].route;

		if (route != '*' && route != '/*') {
			const routeResult = new Route(route);
			const match = routeResult.match(url);

			if (match) {
				routeCurrent.route = routes[i];
				routeCurrent.params = match;
			} else {
				const match = routeResult.match(normalizeReverseRoute(url));

				if (match) {
					routeCurrent.route = routes[i];
					routeCurrent.params = match;
				}
				
			}			
		}

	}

	return routeCurrent;
}

module.exports = {
	normalizeRoute,
	normalizeArray,
	getRoute
};