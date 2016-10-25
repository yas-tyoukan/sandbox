var Q = require('q');
var fs = require('fs');
var ARTICLES_FILE = 'data/articles.json';

/**
 * @memberOf hmx.service.article
 * @returns {Object[]}
 */
function getList() {
	var q = Q.defer();
	fs.readFile(ARTICLES_FILE, 'utf8', function (err, text) {
		if (err) {
			return q.reject(err);
		}
		return q.resolve(JSON.parse(text));
	});
	return q.promise;
}

/**
 * @memberOf hmx.service.article
 */
function create(article) {
	fs.readFile(ARTICLES_FILE, 'utf8', function (err, text) {
		if (err) {
			return q.reject(err);
		}
		return q.resolve(JSON.parse(text).push(article));
	});
	return q.promise;
}

module.exports = {
	getList: getList,
	create: create
};