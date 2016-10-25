var gulp = require('gulp');
var babelify = require('babelify');
var browserify = require('browserify');
var reactify = require('reactify');
var react = require('gulp-react');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var glob = require('glob');

// jsxをrequireするためにいる？
// オプションについては、jstransformのオプションと同じ https://github.com/facebookarchive/jstransform
require('node-jsx').install({
	harmony: true,
	react: true
});

var jsx_path = 'public/js/src/pages/**/*.jsx';

function errorHandler(err) {
	console.log('Error: ' + err.message);
}

// Javascriptへのビルド
// ES6かつJSXなファイル群をjsへ変換
gulp.task('build', function () {
	var src = glob.sync(jsx_path);
	return browserify(src, {
		// debug: true,
		transform: [babelify],
		external: 'react'
	})
		.bundle()
		.on('error', errorHandler)
		.pipe(source('app.js'))
		.pipe(gulp.dest('public/js/build/'));
});

// ファイル監視
// ファイルに更新があったらビルドしてブラウザをリロードする
gulp.task('watch', function () {
	gulp.watch('public/js/src/**/*.jsx', ['build']);
});

// gulpコマンドで起動したときのデフォルトタスク
gulp.task('default', ['build', 'watch']);