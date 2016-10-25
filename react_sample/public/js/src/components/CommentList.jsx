var React = require('react');

var Comment = require('./Comment.jsx');

class CommentList extends React.Component {
	render() {
		var commentNodes = this.props.data.map(function (comment) {
			return (
				<Comment author={comment.author} key={comment.id}>
					{comment.text}
				</Comment>
			);
		});
		return (
			<div className="commentList">
				{commentNodes}
			</div>
		);
	}
}

module.exports = CommentList;