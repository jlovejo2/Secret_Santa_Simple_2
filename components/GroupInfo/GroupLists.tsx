import { gql } from '@apollo/client';
import { Fragment, useState } from 'react';
import { useGetGroupsByUserQuery } from '../../src/graphql/types';

const id = '620a82bd0ad70c0d27d4adcf';

gql`
	query getGroupsByUser($userId: ID!) {
		getGroupsByUser(userId: $userId) {
			first_name
			last_name
			email
			groups {
				groupId
			}
		}
	}
`;

interface GroupListProps {
	userId: string;
}

const GroupList = (props: GroupListProps) => {
	const { userId } = props;
	const { loading, data } = useGetGroupsByUserQuery({ variables: { userId } });

	return (
		<Fragment>
			<div className='max-w-sm rounded shadow-lg'>
				<div className='px-6 py-4'>
					<div className='font-bold text-xl mb-2'></div>
					<ul className='accordion'>
						<li>member one</li>
						<li>member two</li>
					</ul>
				</div>
			</div>
		</Fragment>
	);
};

export default GroupList;
