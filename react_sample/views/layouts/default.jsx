var React = require('react');

class DefaultLayout extends React.Component {
	render() {
		return (
			<html>
			<head>
				<script src="https://unpkg.com/react@15.3.2/dist/react.js"></script>
				<script src="https://unpkg.com/react-dom@15.3.2/dist/react-dom.js"></script>
				<script src="https://unpkg.com/babel-core@5.8.38/browser.min.js"></script>
				<script src="https://unpkg.com/jquery@3.1.0/dist/jquery.min.js"></script>
				<script src="https://unpkg.com/remarkable@1.7.1/dist/remarkable.min.js"></script>

				<title>{this.props.title}</title>
			</head>
			<body>
				<div id="content">{this.props.children}</div>
				<script src='/js/build/app.js'></script>
			</body>
			</html>
		);
	}
}

module.exports = DefaultLayout;