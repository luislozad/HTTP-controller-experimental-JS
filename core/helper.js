function normalizeRoute (route) {
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

function normalizeArray (arr) {
	const newArray = arr.filter(r => r.length > 0);
	return newArray;
}

module.exports = {
	normalizeRoute,
	normalizeArray
};