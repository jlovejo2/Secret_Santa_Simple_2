import { gql } from '@apollo/client';
import { ChangeEvent, FormEvent, Fragment, useState } from 'react';
import { Group, GroupDbObject } from '../../src/dao';
import {
	CreateGroupMutation,
	GroupMember,
	SendPicksInput,
	useCreateGroupMutation,
	useSendPicksMutation
} from '../../src/graphql/types';
import { chooseSecretSanta } from '../../src/utils/custom-functions';
import GroupForm from './GroupForm';
import GroupSummary from './GroupSummary';
import {
	createFormFieldConfig,
	requiredRule,
	maxLengthRule,
	minLengthRule
} from '../../hooks/useForm/helper';

gql`
	mutation createGroup($input: [CreateGroupInput!]!) {
		createGroup(input: $input) {
			groupId
			members {
				first_name
				last_name
				email
			}
		}
	}

	mutation sendPicks($input: SendPicksInput!) {
		sendPicks(input: $input) {
			message
		}
	}
`;

const groupFormObj = {
	firstName: {
		...createFormFieldConfig(
			'First Name',
			'firstName',
			'text',
			'Enter first name here...'
		),
		validationRules: [
			requiredRule('name'),
			minLengthRule('name', 3),
			maxLengthRule('name', 12)
		]
	},
	lastName: {
		...createFormFieldConfig(
			'Last Name',
			'lastName',
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

const GroupCombined = () => {
	const [groupDetails, setGroupDetails] = useState<GroupMember[]>();
	const [currentGroupMember, setCurrentGroupMember] = useState<GroupMember>();
	const [savedGroup, setSavedGroup] = useState<Group | SendPicksInput>();

	const [createGroup] = useCreateGroupMutation();
	const [sendPicks, error] = useSendPicksMutation();

	if (error) console.log('send picks error', error);

	const handleNewGroupMember = (e: FormEvent) => {
		e.preventDefault();

		if (groupDetails) {
			setGroupDetails([...groupDetails, currentGroupMember]);
		} else {
			setGroupDetails([currentGroupMember]);
		}
	};

	const handleChangeGroupForm = (e: ChangeEvent) => {
		const fieldName = (e.currentTarget as HTMLInputElement).name;
		const fieldValue = (e.currentTarget as HTMLInputElement).value;

		switch (fieldName) {
			case 'firstName':
				setCurrentGroupMember({ ...currentGroupMember, first_name: fieldValue });
				break;
			case 'lastName':
				setCurrentGroupMember({ ...currentGroupMember, last_name: fieldValue });
				break;
			case 'email':
				setCurrentGroupMember({ ...currentGroupMember, email: fieldValue });
				break;
			default:
				break;
		}
	};

	const handleSave = async () => {
		const { data } = await createGroup({
			variables: {
				input: groupDetails
			}
		});

		const groupObj = {
			groupId: data.createGroup.groupId,
			members: data.createGroup.members.filter(member => {
				delete member['__typename'];
				return member;
			})
		};
		setSavedGroup(groupObj);
	};

	const handleSecretSantaPicking = () => {
		const newSecretSanta: GroupMember[] = chooseSecretSanta(savedGroup.members);
		setGroupDetails(newSecretSanta);
		setSavedGroup({ groupId: savedGroup.groupId, members: newSecretSanta });
	};

	const handleSendPicks = async () => {
		const { data } = await sendPicks({
			variables: {
				input: savedGroup
			}
		});

		console.log('data from send picks: ', data);
	};

	return (
		<Fragment>
			<div className='col-start-3 col-span-2 justify-center'>
				{}
				{/* <GroupForm
					groupDetails={groupDetails}
					handleChangeGroupForm={handleChangeGroupForm}
					onSubmit={handleNewGroupMember}
				/> */}
			</div>
			<div className='col-start-2 col-span-4'>
				<GroupSummary groupDetails={groupDetails} />
			</div>
			<div className='col-start-2 col-span-4'>
				<button
					type='button'
					onClick={handleSave}
					className='btn-primary mt-2 transition duration-300 ease-in-out focus:outline-none focus:shadow-outline bg-green-700 hover:bg-red-900 text-white font-normal py-2 px-4 mr-1 rounded'
				>
					Save Group
				</button>
				<button
					type='button'
					onClick={handleSecretSantaPicking}
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
			</div>
		</Fragment>
	);
};

export default GroupCombined;
