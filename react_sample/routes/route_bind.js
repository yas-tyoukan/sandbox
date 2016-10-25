module.exports = function (app, routes) {
	for(var url in routes){
		app.use(url, routes[url]);
	}
};