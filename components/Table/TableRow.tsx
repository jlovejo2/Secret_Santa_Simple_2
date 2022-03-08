import React, { Fragment, SyntheticEvent } from 'react';
import { GroupMember } from '../../src/graphql/types';

type TableRowProps = {
	groupDetails: GroupMember[];
	handleDeleteGroupMember: (index: number) => void;
};

const TableRow = (props: TableRowProps) => {
	const { groupDetails, handleDeleteGroupMember } = props;

	const tableRowElem =
		groupDetails.length > 0 ? (
			<Fragment>
				{groupDetails.map((groupMemberInfo, index) => {
					return (
						<tr className='bg-blue-200 h-16 items-center' key={index}>
							{Object.keys(groupDetails[0]).map((groupKey, keyIndex) => {
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
							<td>
								<a
									className='btn-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline bg-red-700 hover:bg-red-900 text-white font-normal py-2 px-4 mr-1 rounded'
									// name='groupMemberIndex'
								>
									Edit
								</a>
								<a
									className='btn-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline bg-red-700 hover:bg-red-900 text-white font-normal py-2 px-4 mr-1 rounded'
									// name='groupMemberIndex'
									// value={index}
									onClick={() => handleDeleteGroupMember(index)}
								>
									delete
								</a>
							</td>
						</tr>
					);
				})}
			</Fragment>
		) : null;

	return <Fragment>{tableRowElem}</Fragment>;
};

export default TableRow;
