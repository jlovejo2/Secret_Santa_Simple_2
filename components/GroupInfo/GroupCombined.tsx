import { gql } from '@apollo/client';
import { FormEvent, Fragment, useEffect, useState } from 'react';
import { GroupDbObject } from '@dao/index';
import {
	Group,
	SendPicksInput,
	useSendPicksMutation,
	User,
	NonUser,
	useUpdateGroupMutation
} from '@graphql/types';
import GroupSummary from './GroupSummary';
import { useForm } from '@hooks/index';
import {
	createFormFieldConfig,
	requiredRule,
	maxLengthRule,
	minLengthRule
} from '@hooks/useForm/helper';

gql`
	mutation sendPicks($input: SendPicksInput!) {
		sendPicks(input: $input) {
			message
		}
	}

	mutation updateGroup($input: SendPicksInput!) {
		updateGroup(input: $input) {
			groupId
		}
	}
`;

const groupFormObj = {
	first_name: {
		...createFormFieldConfig(
			'First Name',
			'first_name',
			'text',
			'Enter first name here...'
		),
		validationRules: [
			requiredRule('name'),
			minLengthRule('name', 3),
			maxLengthRule('name', 12)
		]
	},
	last_name: {
		...createFormFieldConfig(
			'Last Name',
			'last_name',
			'text',
			'Enter last name here...'
		),
		validationRules: [
			requiredRule('name'),
			minLengthRule('name', 3),
			maxLengthRule('name', 12)
		]
	},
	email: {
		...createFormFieldConfig('Email', 'email', 'email', 'Enter email here...'),
		validationRules: [
			requiredRule('email'),
			minLengthRule('email', 10),
			maxLengthRule('email', 25)
		]
	}
};

interface GroupCombinedProps {
	groupId: string;
	groupTitle: string;
	existingMembers: (
		| ({
				__typename: 'User';
		  } & Pick<User, 'userId' | 'first_name' | 'last_name' | 'email'>)
		| ({
				__typename: 'NonUser';
		  } & Pick<NonUser, 'first_name' | 'last_name' | 'email'>)
	)[];
}

const GroupCombined = (props: GroupCombinedProps) => {
	const { groupId, groupTitle, existingMembers } = props;
	const [groupDetails, setGroupDetails] = useState<
		(
			| ({ __typename: 'User' } & Pick<
					User,
					'userId' | 'first_name' | 'last_name' | 'email'
			  >)
			| ({ __typename: 'NonUser' } & Pick<
					NonUser,
					'first_name' | 'last_name' | 'email'
			  >)
		)[]
	>(existingMembers ? existingMembers : []);
	const [savedGroup, setSavedGroup] = useState<Group | SendPicksInput>();
	const [groupForm, setGroupFrom] = useState(groupFormObj);

	const { renderFormInputs, isFormValid, setForm } = useForm(groupForm);

	const [updateGroup] = useUpdateGroupMutation();
	const [sendPicks, error] = useSendPicksMutation();

	useEffect(() => {
		console.log(groupId, existingMembers);
		setGroupDetails(existingMembers);
	}, [groupId, existingMembers]);

	if (error) console.log('send picks error', error);

	const handleNewGroupMember = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		let newGroupMember: any = {};
		const keysArr = Object.keys(groupFormObj);

		for (let field of keysArr) {
			newGroupMember[field] = e.currentTarget[field].value;
		}

		const filledGroupMember = newGroupMember;

		console.log('group member info: ', newGroupMember, filledGroupMember);

		if (groupDetails) {
			setGroupDetails([...groupDetails, filledGroupMember]);
		} else {
			setGroupDetails([filledGroupMember]);
		}
	};

	const handleDeleteGroupMember = memberIndex => {
		const newGroupDetails = groupDetails.filter((groupMember, index) => {
			return index !== memberIndex;
		});

		console.log('delete group member', newGroupDetails);

		setGroupDetails(newGroupDetails);
	};

	const handleSave = async () => {
		console.log(groupDetails);

		const { data } = await updateGroup({
			variables: {
				input: {
					groupId: groupId,
					members: groupDetails
				}
			}
		});
	};

	// 	const groupObj = {
	// 		groupId: data.createGroup.groupId,
	// 		members: data.createGroup.members.filter(member => {
	// 			delete member['__typename'];
	// 			return member;
	// 		})
	// 	};
	// 	setSavedGroup(groupObj);
	// };

	// const handleSecretSantaPicking = () => {
	// 	const newSecretSanta: GroupMember[] = chooseSecretSanta(savedGroup.members);
	// 	setGroupDetails(newSecretSanta);
	// 	setSavedGroup({ groupId: savedGroup.groupId, members: newSecretSanta });
	// };

	const handleSendPicks = async () => {
		// const { data } = await sendPicks({
		// 	variables: {
		// 		input: savedGroup
		// 	}
		// });
	};

	return (
		<Fragment>
			<div className='col-start-3 col-span-2 justify-center'>
				<h1 className='text-center font-bold uppercase'>{groupTitle}</h1>
				<form className='m-2' onSubmit={handleNewGroupMember}>
					{renderFormInputs()}
					<div>
						<button
							type='submit'
							disabled={!isFormValid()}
							className={`btn-primary ${
								isFormValid() ? '' : 'disabled:opacity-50 disabled:bg-green-700'
							} mt-2 transition duration-300 ease-in-out focus:outline-none focus:shadow-outline bg-green-700 hover:bg-red-900 text-white font-normal py-2 px-4 mr-1 rounded`}
						>
							Submit
						</button>
					</div>
				</form>
			</div>
			<div className='col-start-2 col-span-4'>
				<GroupSummary
					groupDetails={groupDetails}
					handleDeleteGroupMember={handleDeleteGroupMember}
				/>
			</div>
			<div className='col-start-2 col-span-4'>
				{groupDetails ? (
					<Fragment>
						<button
							type='button'
							onClick={handleSave}
							className={`btn-primary ${
								groupDetails ? '' : 'disabled:opacity-50 disabled:bg-green-700'
							} mt-2 transition duration-300 ease-in-out focus:outline-none focus:shadow-outline bg-green-700 hover:bg-red-900 text-white font-normal py-2 px-4 mr-1 rounded`}
							disabled={groupDetails ? false : true}
						>
							Save Group
						</button>
						<button
							type='button'
							// onClick={handleSecretSantaPicking}
							className={`btn-primary ${
								savedGroup ? '' : 'disabled:opacity-50 disabled:bg-green-700'
							} mt-2 transition duration-300 ease-in-out focus:outline-none focus:shadow-outline bg-green-700 hover:bg-red-900 text-white font-normal py-2 px-4 mr-1 rounded`}
							disabled={savedGroup ? false : true}
						>
							Start picking
						</button>
						<button
							type='button'
							onClick={handleSendPicks}
							className='btn-primary mt-2 transition duration-300 ease-in-out focus:outline-none focus:shadow-outline bg-green-700 hover:bg-red-900 text-white font-normal py-2 px-4 mr-1 rounded'
						>
							Send Picks
						</button>
					</Fragment>
				) : (
					''
				)}
			</div>
		</Fragment>
	);
};

export default GroupCombined;
