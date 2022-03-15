import { gql } from '@apollo/client';
import { useTodoQuery, useUpdateTodoMutation } from '@lib/graphql/types';
import { useState, ChangeEvent, useEffect } from 'react';
import { EditIcon, TrashcanIcon } from '../UI/Icons';

interface Props {
	todoId: string;
}

gql`
	query Todo($todoId: ID!) {
		Todo(todoId: $todoId) {
			description
			completed
		}
	}
	mutation UpdateTodo($todoId: ID!, $data: UpdateTodoInput!) {
		updateTodo(todoId: $todoId, data: $data) {
			description
			completed
		}
	}
`;

const Todo = (props: Props) => {
	const { todoId } = props;
	const [selectedTodoId, setSelectedTodoId] = useState('');
	const [selectedTodoValue, setSelectedTodoValue] = useState('');
	const { loading, data } = useTodoQuery({
		variables: {
			todoId
		}
	});
	const [localCompleted, setLocalCompleted] = useState(false);
	const [updateTodo] = useUpdateTodoMutation();
	let content = <td colSpan={2}>Loading ...</td>;

	useEffect(() => {
		setLocalCompleted(data?.Todo?.completed || false);
		if (data) setSelectedTodoValue(data.Todo.description);
	}, [data?.Todo?.completed]);

	const handleSelectedTodos = todoToEdit => {
		if (selectedTodoId === todoToEdit) {
			setSelectedTodoId('');
		} else setSelectedTodoId(todoToEdit);

		if (selectedTodoValue !== data.Todo?.description)
			updateTodo({
				variables: { todoId, data: { description: selectedTodoValue } }
			});
	};

	const handleEditTodo = (e: ChangeEvent) => {
		setSelectedTodoValue((e.target as HTMLInputElement).value);
	};

	const onToggleCompleted = (e: ChangeEvent) => {
		const completed = (e.target as HTMLInputElement).checked;
		setLocalCompleted(completed);
		updateTodo({
			variables: {
				todoId,
				data: {
					completed
				}
			}
		});
	};

	if (!loading && data) {
		const { description } = data.Todo;
		content = (
			<>
				<td>
					<input
						type='checkbox'
						checked={localCompleted}
						onChange={onToggleCompleted}
					></input>
				</td>
				<td className='pl-2'>
					{selectedTodoId.includes(todoId) ? (
						<input onChange={handleEditTodo} value={selectedTodoValue}></input>
					) : (
						selectedTodoValue
					)}
				</td>
				<td className='pl-2'>
					<a onClick={() => handleSelectedTodos(todoId)}>
						<EditIcon />
					</a>
				</td>
				<td className='pl-2'>
					<TrashcanIcon />
				</td>
			</>
		);
	}
	return <tr className='mt-4'>{content}</tr>;
};

export default Todo;
