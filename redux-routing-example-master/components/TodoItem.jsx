import React, { Component } from 'react';
import InputText from './InputText';

class TodoItem extends Component {
	render() {
		const { todo } = this.props;
		return (
			<div className="view">
				<button className="destroy" >delete</button>
				<label id={todo.id}>
					{todo.text}
				</label>
			</div>
		);
	}
}
export default TodoItem;