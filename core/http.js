const routers = {
	get: [],
	post: [],
	put: [],
	delete: []
};

exports.routers = routers;

exports.get = function(route, handler) {
	const filterRoute = (item) => item.route == route;
	
	if (!routers.get.some(filterRoute)) {
		routers.get.push({
			route,
			handler
		});		
	}
	else
	{
		throw new Error('The route is already defined: ' + route);
	}
};