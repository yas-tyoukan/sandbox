var express = require('express');
var router = express.Router();

var articleService = require('service/article');

router.get('/', function (req, res, next) {
	articleService.getList().then(function (data) {
		res.json(data);
	}).fail(next);
});

router.post('/', function (req, res, next) {
	var article = {
		title: req.body.title,
		comment: req.body.comment
	};
	articleService.create(article).done(res.json);
});

module.exports = router;