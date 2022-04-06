import { useIndexQuery, useCreateTodoMutation } from '@src/graphql/types';
import { gql } from '@apollo/client';
import { Todo } from '@components/index';
import { useState, useEffect, FormEvent } from 'react';
import { Layout, Sidebar, DashboardMenuBar } from '@components/index';
import { PlusIcon } from '@components/UI/Icons';
import { useRouter } from 'next/router';

gql`
	query Index {
		allTodos {
			todoId
		}
	}

	mutation CreateTodo($description: String!) {
		createTodo(description: $description) {
			todoId
			description
			completed
		}
	}
`;

const Wishlist = () => {
	const [show, setShow] = useState(false);
	const [profile, setProfile] = useState(false);
	const { data, loading, error } = useIndexQuery();
	const [createTodo] = useCreateTodoMutation();
	const router = useRouter();

	const [todoIds, setTodoIds] = useState<string[]>();

	const fillTodoIds = (data: string[]) => {
		setTodoIds(data?.slice().sort((a, b) => a.localeCompare(b)));
	};

	useEffect(() => {
		fillTodoIds(data?.allTodos?.map(t => t.todoId));

		if (error) router.push('/');
	}, [data?.allTodos, error, loading]);

	const handleCreateTodo = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(e.target[0].value);

		const { data } = await createTodo({
			variables: { description: e.target[0].value.toString() }
		});

		if (data) router.reload();
	};

	const todoElements = todoIds?.map(id => <Todo todoId={id} key={id} />);

	const body =
		loading || typeof todoElements === 'undefined' ? null : todoElements.length >
		  0 ? (
			<>
				<div className='flex justify-center'>
					<form onSubmit={handleCreateTodo}>
						<input
							className='w-48 pl-2 ml-2 border border-black'
							placeholder='Enter description ...'
						></input>
						<button
							type='submit'
							className='w-24 ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-indigo-700'
						>
							Save Todo
						</button>
					</form>
				</div>
				<table className='table-auto mt-4'>
					<tbody>{todoElements}</tbody>
				</table>
			</>
		) : (
			<div>No ToDos!</div>
		);

	return (
		<>
			<Layout>
				<div className='w-full h-full bg-gray-200'>
					<div className='flex flex-no-wrap justify-center'>
						<Sidebar showSidebar={show} setSidebar={() => setShow(!show)} />
						<div className='w-full'>
							<DashboardMenuBar
								showDashboardMenu={show}
								setShowDashboardMenu={() => setShow(!show)}
								showProfile={profile}
								setShowProfile={() => setProfile(!profile)}
							/>
							{/* Remove class [ h-64 ] when adding a card block */}
							<div className='container md:grid md:grid-cols-2 md:gap-6 bg-red mx-auto py-10 h-64 md:w-4/5 w-11/12 px-6'>
								{/* Remove class [ border-dashed border-2 border-gray-300 ] to remove dotted border */}
								<div className='w-full h-full justify-center rounded border-dashed border-2 border-gray-300'>
									{body}
								</div>
								<div className='w-full h-full rounded border-dashed border-2 border-gray-300'>
									<button className='w-44 ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-indigo-700'>
										<PlusIcon width={30} height={30} />
										<span className='pl-2'>Create a List</span>
									</button>
									<p className='text-lg text-bold'>Current Lists</p>
									<ul>
										<li>asdfsd</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		</>
	);
};

export default Wishlist;
