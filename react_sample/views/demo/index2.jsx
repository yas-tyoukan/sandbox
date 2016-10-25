import React from 'react';
import ReactDOM from 'react-dom';
import DefaultLayout from '../layouts/default';
import CommentBox from '../../public/js/src/components/CommentBox';

import request from 'superagent';

class Content extends React.Component {
	// constructor(props) {
	// 	super(props);
	// 	this.url = '/api/articles';
	// 	this.state = {
	// 		articles: []
	// 	}
	// }
	render() {
		return (
			<DefaultLayout page="tutorial">
				<h1>コメントボックスを使う別のページ</h1>
				<CommentBox className="commentBox">
				</CommentBox>
			</DefaultLayout>
		);
	}
}

module.exports = Content;