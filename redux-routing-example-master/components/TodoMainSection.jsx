import React, {Component, PropTypes} from 'react';
import  TodoItem from './TodoItem';

class MainSection extends Component {
	render() {
		const {todos} = this.props;
		return (
			<section className="main">
				<ul className="todo-list">
					{todos.map(todo =>
						<TodoItem key={todo.id} todo={todo}/>
					)}
				</ul>
			</section>
		);
	}
}

export default MainSection;