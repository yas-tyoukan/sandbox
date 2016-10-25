var express = require('express');
var router = express.Router();

var commentService = require('service/comments');

router.get('/', function (req, res, next) {
	commentService.getList().then(function (data) {
		res.json(data);
	}).fail(next);
});

router.post('/', function (req, res, next) {
	var comment = {
		author: req.body.author,
		text: req.body.text
	};
	commentService.create(comment).done((data) => res.json(data));
});

module.exports = router;