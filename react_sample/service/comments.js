var Q = require('q');
var fs = require('fs');
var COMMENTS_FILE = 'data/comments.json';

/**
 * @memberOf hmx.service.article
 * @returns {Object[]}
 */
function getList() {
	var q = Q.defer();
	fs.readFile(COMMENTS_FILE, 'utf8', (err, text) => {
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
function create(data) {
	var q = Q.defer();
	fs.readFile(COMMENTS_FILE, 'utf8', function (err, text) {
		if (err) {
			return q.reject(err);
		}
		var res = JSON.parse(text);
		var id = res.push(data);
		data.id = id;
		fs.writeFile(COMMENTS_FILE, JSON.stringify(res), err => {
			if (err) {
				q.reject(err);
			}
		});
		return q.resolve(res);
	});
	return q.promise;
}

module.exports = {
	getList: getList,
	create: create
};