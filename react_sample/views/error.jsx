var React = require('react');

var errPage = React.createClass({
	handler: function(e){
		alert('A');
	},
	render: function () {
		return (
			<div className="contents">
				<h1>{this.props.message}</h1>
				<h2>{this.props.error.status}</h2>
				<pre>{this.props.error.stack}</pre>
				<button onClick={this.handler}></button>
			</div>
		);
	}
});

module.exports = errPage;