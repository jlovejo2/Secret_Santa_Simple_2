import { gql } from '@apollo/client';
import { GroupMember } from '../../src/graphql/types';
import {
	useState,
	ChangeEvent,
	useEffect,
	Fragment,
	SetStateAction,
	Dispatch,
	SyntheticEvent
} from 'react';
import { TableHeader, TableRow } from '../Table';
import { emailSender } from '../../src/dao/nodeMailer';
import { CreateGroupInput } from '../../src/dao';

interface Props {
	groupDetails: GroupMember[] | CreateGroupInput[];
	handleDeleteGroupMember: (e: SyntheticEvent) => void;
}

const GroupSummary = (props: Props) => {
	const { groupDetails, handleDeleteGroupMember } = props;

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
