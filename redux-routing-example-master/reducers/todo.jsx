import {ADD_TODO, DELETE_TODO} from '../constants/ActionTypes';

const initialState = [
	{
		id: 0,
		text: 'Learn Redux',
	},
];

export default function todos(state = initialState, action) {
	switch (action.type) {
		case ADD_TODO:
			return [
				{
					id: new Date().getTime(),
					text: action.text,
				},
				...state,
			];

		case DELETE_TODO:
			return state.filter(todo =>
				todo.id !== action.id
			);

		default:
			return state;
	}
}