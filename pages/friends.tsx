import { useIndexQuery } from '../src/graphql/types';
import { gql } from '@apollo/client';
import { Todo } from '../components';
import { useState, ChangeEvent, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { Sidebar } from '../components/Sidebar';
import { DashboardMenuBar } from '../components/DashboardMenuBar';
import { PlusIcon } from '../components/UI/Icons';

gql`
	query Index {
		allTodos {
			todoId
		}
	}
`;

const Friends = () => {
	const [show, setShow] = useState(false);
	const [profile, setProfile] = useState(false);
	const [menu, setMenu] = useState(false);
	const [menu1, setMenu1] = useState(false);
	const [menu2, setMenu2] = useState(false);
	const [menu3, setMenu3] = useState(false);
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
				<button className='w-48'>
					<PlusIcon />
					<span className=''>Create a Todo</span>
				</button>
				<hr />
				<hr />
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
				{/* <div className='col-start-2 col-span-4'>
					<GroupCombined />
				</div> */}
				<div className='w-full h-full bg-gray-200'>
					<div className='flex flex-no-wrap'>
						<Sidebar showSidebar={show} setSidebar={() => setShow(!show)} />
						<div className='w-full'>
							<DashboardMenuBar
								showDashboardMenu={show}
								setShowDashboardMenu={() => setShow(!show)}
								showProfile={profile}
								setShowProfile={() => setProfile(!profile)}
							/>
							{/* Remove class [ h-64 ] when adding a card block */}
							<div className='container mx-auto py-10 h-64 md:w-4/5 w-11/12 px-6'>
								{/* Remove class [ border-dashed border-2 border-gray-300 ] to remove dotted border */}
								<div className='w-full h-full rounded border-dashed border-2 border-gray-300'>
									{/* Place your content here */}
									{body}
								</div>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		</>
	);
};

export default Friends;
