import { gql } from '@apollo/client';
import { GroupMember } from '@graphql/types';
import { Fragment } from 'react';
import { TableHeader, TableRow } from '../Table';
// import { emailSender } from '../../dao/nodeMailer';

interface Props {
	groupDetails: GroupMember[];
	handleDeleteGroupMember: (index: number) => void;
}

const GroupSummary = (props: Props) => {
	const { groupDetails, handleDeleteGroupMember } = props;

	console.log(groupDetails);

	return (
		<Fragment>
			{groupDetails ? (
				<>
					<table className='table-auto w-full text-center'>
						<TableHeader groupDetails={groupDetails} />
						<tbody>
							<TableRow
								groupDetails={groupDetails}
								handleDeleteGroupMember={handleDeleteGroupMember}
							/>
						</tbody>
					</table>
				</>
			) : (
				<div></div>
			)}
		</Fragment>
	);
};

export default GroupSummary;
