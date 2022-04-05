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
import { PlusIcon, GroupIcon, TrashcanIcon } from '@components/UI/Icons';
import {
	useCreateGroupMutation,
	useGetGroupsByUserQuery,
	useDeleteGroupMutation
} from '@src/graphql/types';
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

	mutation deleteGroup($groupId: String!) {
		deleteGroup(groupId: $groupId)
	}
`;

const SecretSantaGroups = props => {
	const { userId = '6218c584bec3237df0258add' } = props;
	const [show, setShow] = useState(false);
	const [selectedGroup, setSelectedGroup] = useState(0);
	const [getGroupsData, setGetGroupsData] = useState<any[]>();
	const [profile, setProfile] = useState(false);
	const router = useRouter();
	const { loading, data, error } = useGetGroupsByUserQuery({
		variables: { userId }
	});
	const [createGroup] = useCreateGroupMutation();
	const [deleteGroup] = useDeleteGroupMutation();

	useEffect(() => {
		if (error) router.push('/');

		setGetGroupsData(data?.getGroupsByUser?.groups);
	}, [error, data]);

	const handleCreateGroup = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const { data: createGroupData } = await createGroup({
			variables: {
				input: {
					title: `${e.target[0].value.toString()}`,
					members: []
				}
			}
		});

		if (createGroupData) router.reload();
	};

	const handleDeleteGroup = async (index: number) => {
		const groupToBeDeleted = data?.getGroupsByUser.groups[index].groupId;

		const { data: deleteGroupResult } = await deleteGroup({
			variables: {
				groupId: groupToBeDeleted
			}
		});

		if (deleteGroupResult) {
			if (selectedGroup === index) setSelectedGroup(0);

			const filteredGroupsData = getGroupsData.filter((group, groupIndex) => {
				return group.groupId !== groupToBeDeleted;
			});

			setGetGroupsData([...filteredGroupsData]);
		}
	};

	return (
		<>
			<Layout>
				<div className='w-full h-full bg-gray-200'>
					<div className='flex flex-no-wrap h-full'>
						<Sidebar showSidebar={show} setSidebar={() => setShow(!show)} />
						<div className='w-full h-full'>
							<DashboardMenuBar
								showDashboardMenu={show}
								setShowDashboardMenu={() => setShow(!show)}
								showProfile={profile}
								setShowProfile={() => setProfile(!profile)}
							/>
							{/* Remove class [ h-64 ] when adding a card block */}
							<div className='container max-h-full mx-auto w-11/12 px-6'>
								{/* Remove class [ border-dashed border-2 border-gray-300 ] to remove dotted border */}
								<div className='w-full grid grid-cols-4 gap-2 rounded'>
									<div className='grid-cols-span-1'>
										<form
											className='flex flex-row mt-2 py-2 justify-between'
											onSubmit={handleCreateGroup}
										>
											<div className='w-3/5'>
												<input
													className='w-56 pl-2 border border-black'
													placeholder='Enter group title ...'
												></input>
											</div>
											<div className='w-2/5 flex justify-end'>
												<button
													type='submit'
													className='whitespace-nowrap inline-flex items-center justify-center px-1 py-1 border border-transparent rounded-md shadow-sm text-base font-small text-white bg-green-600 hover:bg-indigo-700'
												>
													<PlusIcon width={15} height={15} />
													<p className='pl-2'>Create Group</p>
												</button>
											</div>
										</form>
										{loading ? (
											<div>Loading Group data ...</div>
										) : getGroupsData ? (
											getGroupsData.map((groupData, index) => {
												const additionalAccordionIcons = [
													{
														icon: <GroupIcon width={15} height={15} />,
														tooltipContent: 'Select This Group',
														tooltipDirection: 'top',
														onClick: () => setSelectedGroup(index)
													},
													{
														icon: <TrashcanIcon width={15} height={15} />,
														tooltipContent: 'Delete this Group',
														tooltipDirection: 'top',
														onClick: () => handleDeleteGroup(index)
													}
												];
												return (
													<Accordion
														key={index}
														expandIcon={<PlusIcon width={15} height={15} />}
														title={groupData.title}
														additionalIcons={additionalAccordionIcons}
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
									<div className='col-span-3 h-full justify-center border-solid border-2 border-gray-500 p-4 mx-4'>
										<h1>Selected Group</h1>
										{typeof selectedGroup === 'number' && getGroupsData ? (
											<GroupCombined
												groupId={
													typeof selectedGroup === 'number'
														? getGroupsData[selectedGroup].groupId
														: ''
												}
												groupTitle={
													typeof selectedGroup === 'number'
														? getGroupsData[selectedGroup].title
														: ''
												}
												existingMembers={
													typeof selectedGroup === 'number'
														? getGroupsData[selectedGroup].members
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
