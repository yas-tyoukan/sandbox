import React, {PropTypes, Component} from 'react';

class InputText extends Component {
	constructor(props) {
		super(props);
		this.state = ({text: ''});
	}

	handleSubmit(e) {
		const text = e.target.value.trim();
		if (e.which === 13) {
			this.props.onSave(text);
			this.setState({text: ''});
		}
	}

	handleChange(e) {
		this.setState({text: e.target.value});
	}

	render() {
		const {placeholder} = this.props;
		const {text} = this.state;
		return (
			<input
				placeholder={placeholder}
				type="text"
				autoFocuse
				value={text}
				onChange={::this.handleChange}
				onKeyDown={::this.handleSubmit}
			/>
		);
	}
}

export default InputText;
