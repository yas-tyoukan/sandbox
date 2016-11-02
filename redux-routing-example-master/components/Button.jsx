import React, { PropTypes, Component } from 'react';

class Button extends Component {
	render() {
		return (
			<p><a href="#" className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">{this.prop}</a></p>
		);
	}
}

export default Button;




