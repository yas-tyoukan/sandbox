var React = require('react');

class Comment extends React.Component {
	rawMarkup() {
		var md = new Remarkable();
		var rawMarkup = md.render(this.props.children.toString());
		return {__html: rawMarkup};
	}

	render() {
		var md = new Remarkable();
		return (
			<div className="comment">
				<h2 className="commentAuthor">
					{this.props.author}
				</h2>
				<span dangerouslySetInnerHTML={this.rawMarkup.bind(this)(this.props.children.toString())}/>
			</div>
		);
	}
}

module.exports = Comment;