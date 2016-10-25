var express = require('express');
var router  = express.Router();

var service = require('service/comments');

router.get('/', function (req, res, next) {
	service.getList().then(function(data){
		console.log(data);
		res.render('demo/index', {articles:data});
	}).fail(next);
});

router.get('/2', function (req, res, next) {
	service.getList().then(function(data){
		res.render('demo/index2', {articles:data});
	}).fail(next);
});

module.exports = router;