import React from 'react';
import { CreateGroupInput } from '@src/dao';
import { GroupMember } from '@src/graphql/types';

type TableHeaderProps = {
	groupDetails:
		| GroupMember[]
		| CreateGroupInput[]
		| ({ __typename: 'User' } | { __typename: 'NonUser' })[];
};

const convertToDisplay = (inputString: string) => {
	const splitArray = inputString.split('_');
	let displayString = '';

	for (let i of splitArray) {
		displayString = displayString + ' ' + i;
	}

	return displayString;
};

const TableHeader = (props: TableHeaderProps) => {
	const { groupDetails } = props;

	const groupKeysElem =
		groupDetails.length > 0 ? (
			<thead>
				<tr>
					{Object.keys(groupDetails[0]).map((groupKey, index) => {
						return (
							<th key={index} className=''>
								{convertToDisplay(groupKey)}
							</th>
						);
					})}
				</tr>
			</thead>
		) : (
			<div>No Group members</div>
		);

	return <>{groupKeysElem}</>;
};

export default TableHeader;
