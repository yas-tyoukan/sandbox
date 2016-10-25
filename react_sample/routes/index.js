var routes = {
	'/': require('../controller/demo'),
	'/app': require('../controller/app'),
	'/api/articles': require('../controller/api/articles'),
	'/api/comments': require('../controller/api/comments')
};

module.exports = routes;