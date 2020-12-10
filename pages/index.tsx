import {
	CreateGroupInput,
	GroupMember,
	useIndexQuery
} from '../src/graphql/types';
import { gql } from '@apollo/client';
import { GroupCombined, Todo, Navbar } from '../components';
import {
	useState,
	ChangeEvent,
	SyntheticEvent,
	useEffect,
	FormEvent
} from 'react';
import { Layout } from '../components/Layout';

gql`
	query Index {
		allTodos {
			todoId
		}
	}
`;

const Index = () => {
	const { data, loading } = useIndexQuery();
	const [newTodoDescription, setNewTodoDescription] = useState('');

	const [todoIds, setTodoIds] = useState<string[]>();

	const fillTodoIds = (data: string[]) => {
		setTodoIds(data?.slice().sort((a, b) => a.localeCompare(b)));
	};

	useEffect(() => {
		fillTodoIds(data?.allTodos?.map(t => t.todoId));
	}, [data?.allTodos]);

	const updateTodoDescription = (e: ChangeEvent) => {
		setNewTodoDescription((e.target as HTMLInputElement).value.toString());
	};

	const changeCurrentGroupMember = (e: ChangeEvent) => {};

	const onClickAddTodo = () => {};

	const todoElements = todoIds?.map(id => <Todo todoId={id} key={id} />);

	const body =
		loading || typeof todoElements === 'undefined' ? null : todoElements.length >
		  0 ? (
			<>
				<table>
					<tbody>{todoElements}</tbody>
				</table>
			</>
		) : (
			<div>No ToDos!</div>
		);

	return (
		<>
			<Layout>
				<div className='col-start-2 col-span-4'>
					<GroupCombined />
				</div>
			</Layout>
		</>
	);
};

export default Index;
