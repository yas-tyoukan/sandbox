var React = require('react');
var CommentList = require('./CommentList.jsx');
var CommentForm = require('./CommentForm.jsx');

class CommentBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {data: []};
	}

	loadCommentsFromServer() {
		$.ajax({
			url: this.props.url,
			dataType: 'json'
		}).done(data => {
			this.setState({data: data});
		}).fail((xhr, status, err) => {
			console.error(this.props.url, status, err.toString());
		});
	}

	handleCommentSubmit(comment) {
		$.ajax({
			url: this.props.url,
			type: 'POST',
			data: comment
		});
	}

	componentDidMount() {
		this.loadCommentsFromServer();
		setInterval(this.loadCommentsFromServer.bind(this), this.props.pollInterval);
	}

	render() {
		return (
			<div className="commentBox">
				<h1>Comments</h1>
				<CommentList data={this.state.data}/>
				<CommentForm onCommentSubmit={this.handleCommentSubmit.bind(this)}/>
			</div>
		);
	}
}

module.exports = CommentBox;