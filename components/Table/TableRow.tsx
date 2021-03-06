import React, { Fragment, SyntheticEvent } from 'react';
import { GroupMember } from '../../src/graphql/types';

type TableRowProps = {
	groupDetails: GroupMember[];
	handleDeleteGroupMember: (e: SyntheticEvent) => void;
};

const TableRow = (props: TableRowProps) => {
	const { groupDetails, handleDeleteGroupMember } = props;

	const groupKeysArray = Object.keys(groupDetails[0]);

	return (
		<Fragment>
			{groupDetails.map((groupMemberInfo, index) => {
				return (
					<tr className='bg-blue-200' key={index}>
						{groupKeysArray.map((groupKey, keyIndex) => {
							return (
								<td key={keyIndex}>
									{typeof groupMemberInfo[groupKey] === 'string' &&
									groupKey != 'secret_pick'
										? groupMemberInfo[groupKey]
										: groupKey === 'secret_pick'
										? 'pick successful'
										: 'No pick'}
								</td>
							);
						})}
						<button
							type='button'
							className='btn-primary mt-2 transition duration-300 ease-in-out focus:outline-none focus:shadow-outline bg-red-700 hover:bg-red-900 text-white font-normal py-2 px-4 mr-1 rounded'
							name='groupMemberIndex'
							value={index}
						>
							Edit
						</button>
						<button
							type='button'
							className='btn-primary mt-2 transition duration-300 ease-in-out focus:outline-none focus:shadow-outline bg-red-700 hover:bg-red-900 text-white font-normal py-2 px-4 mr-1 rounded'
							name='groupMemberIndex'
							value={index}
							onClick={handleDeleteGroupMember}
						>
							delete
						</button>
					</tr>
				);
			})}
		</Fragment>
	);
};

export default TableRow;
