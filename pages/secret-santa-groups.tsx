import { gql } from '@apollo/client';
import {
	GroupCombined,
	Layout,
	Sidebar,
	DashboardMenuBar
} from '@components/index';
import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { Accordion } from '@components/UI/Accordion';
import { PlusIcon, GroupIcon } from '@components/UI/Icons';
import {
	useCreateGroupMutation,
	useGetGroupsByUserQuery
} from '@graphql/types';
import GroupList from '@components/GroupInfo/GroupLists';

gql`
	query getGroupsByUser($userId: ID!) {
		getGroupsByUser(userId: $userId) {
			userId
			first_name
			last_name
			groups {
				groupId
				title
				members {
					__typename
					... on User {
						userId
						first_name
						last_name
						email
					}
					... on NonUser {
						first_name
						last_name
						email
					}
				}
			}
		}
	}

	mutation createGroup($input: CreateGroupInput!) {
		createGroup(input: $input) {
			groupId
			title
			members {
				__typename
				... on User {
					userId
					first_name
					last_name
					email
				}
				... on NonUser {
					first_name
					last_name
					email
				}
			}
		}
	}
`;

const SecretSantaGroups = props => {
	const { userId = '6218c584bec3237df0258add' } = props;
	const [show, setShow] = useState(false);
	const [selectedGroup, setSelectedGroup] = useState(0);
	const [profile, setProfile] = useState(false);
	const router = useRouter();
	const { loading, data, error } = useGetGroupsByUserQuery({
		variables: { userId }
	});
	const [createGroup] = useCreateGroupMutation();

	useEffect(() => {
		if (error) router.push('/');

		if (data) console.log(data);

		console.log(selectedGroup);
	}, [error, data, selectedGroup]);

	const handleCreateGroup = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const { data } = await createGroup({
			variables: {
				input: {
					title: `${e.target[0].value.toString()}`,
					members: []
				}
			}
		});

		if (data) router.reload();
	};

	return (
		<>
			<Layout>
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
								<div className='w-full h-full grid grid-cols-2 gap-2 rounded'>
									<div>
										<div className='flex justify-center'>
											<form onSubmit={handleCreateGroup}>
												<input
													className='w-48 pl-2 ml-2 border border-black'
													placeholder='Enter group title ...'
												></input>
												<button
													type='submit'
													className='ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-indigo-700'
												>
													<PlusIcon width={15} height={15} />
													<p className='pl-2'>Create Group</p>
												</button>
											</form>
										</div>
										{loading ? (
											<div>Loading Group data ...</div>
										) : data?.getGroupsByUser?.groups ? (
											data.getGroupsByUser.groups.map((groupData, index) => {
												return (
													<Accordion
														key={index}
														handleAddGroupMember={() => setSelectedGroup(index)}
														expandIcon={<PlusIcon width={15} height={15} />}
														addGroupMemberIcon={<GroupIcon width={15} height={15} />}
														title={groupData.title}
													>
														<GroupList
															members={groupData.members}
															userId={data.getGroupsByUser.userId}
														/>
													</Accordion>
												);
											})
										) : (
											<div>No Groups for User</div>
										)}
									</div>
									<div>
										{typeof selectedGroup === 'number' ? (
											<GroupCombined
												groupId={
													typeof selectedGroup === 'number'
														? data?.getGroupsByUser.groups[selectedGroup].groupId
														: ''
												}
												groupTitle={
													typeof selectedGroup === 'number'
														? data?.getGroupsByUser.groups[selectedGroup].title
														: ''
												}
												existingMembers={
													typeof selectedGroup === 'number'
														? data?.getGroupsByUser.groups[selectedGroup].members
														: []
												}
											/>
										) : (
											<div>No Group has been selected</div>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		</>
	);
};

export default SecretSantaGroups;
