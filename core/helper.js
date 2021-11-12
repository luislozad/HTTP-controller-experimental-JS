const Route = require('route-parser');

function searchBinary(arr, target){
    const max = arr.length - 1;
    let min = 0;
    let pivote = Math.round(Math.random() * (max - min) + min);

    while(arr[pivote] !== target && min <= max) {
        const left = arr[min];
        const right = arr[pivote];
        arr[min] = right;
        arr[pivote] = left;
        min++
        pivote = Math.round(Math.random() * (max - min) + min);
    }

    return arr[pivote] === target ? pivote : -1;
}

function parseRoute(route) {
	return route
			.split('/')
			.filter(r => r.length > 0 && r !== '*');
}

function normalizeRoute(route) {
	const routes = parseRoute(route);

	if (routes.length > 0) {
	    routes[0] = '/' + routes[0];
	    routes[routes.length - 1] += '/';

	    return routes.join('/');
	} else {
		return route;
	}
}

function normalizeLeftRoute(route) {
	const routes = parseRoute(route);

	if (routes.length > 0) {
	    routes[0] = '/' + routes[0];

	    return routes.join('/');
	} else {
		return route;
	}

}

function getRoute(routes, url, predicate = null) {
	const predicateDefault = (r) => !r.includes('*');
	const isRouteValid = predicate ? predicate : predicateDefault;
	const isRouteScope = (r) => r.length > 1 && r.includes('/*');

	let routeCurrent = {
		route: null,
		params: null
	};

	for (let i = 0; i < routes.length && !routeCurrent.route; i++) {
		const { route, handler } = routes[i];

		if (isRouteValid(route)) {
			routeCurrent = getRouteParse({ route, handler, url});
		} else if (isRouteScope(route)) {
			routeCurrent = getRouteScope({ route, handler, url });
		}
	}

	return routeCurrent;
}

function getRouteParse({ route, handler, url }) {
	const routeCurrent = {
		route: null,
		params: null
	};	

	const routeResult = new Route(route);
	const match = routeResult.match(url);

	if (match) {
		routeCurrent.route = { route, handler };
		routeCurrent.params = match;
	} else {
		const match = routeResult.match(normalizeLeftRoute(url));

		if (match) {
			routeCurrent.route = { route, handler };
			routeCurrent.params = match;
		}
		
	}

	return routeCurrent;
}

function getRouteScope({ route, handler, url }) {
	const routeCurrent = {
		route: null,
		params: null
	};		

	const routeValid = normalizeLeftRoute(route);

	if (url.includes(routeValid)) {
		const routes = parseRoute(route);
		const paths = parseRoute(url);

		let isValid = false;

		for (let i = 0; i < routes.length; i++) {
			isValid = routes[i] === paths[i];
		}

		if (isValid) {
			routeCurrent.route = { url, handler },
			routeCurrent.params = null;
		}		
	}

	return routeCurrent;
}

module.exports = {
	normalizeRoute,
	parseRoute,
	getRoute
};