import { gql } from '@apollo/client';
import { Group } from '@lib/dao/types';
import { NonUser, User } from '@lib/graphql/types';
import { Fragment } from 'react';

const id = '620a82bd0ad70c0d27d4adcf';

interface GroupListProps {
	userId: string;
	members?: (
		| ({
				__typename: 'User';
		  } & Pick<User, 'userId' | 'first_name' | 'last_name' | 'email'>)
		| ({
				__typename: 'NonUser';
		  } & Pick<NonUser, 'first_name' | 'last_name' | 'email'>)
	)[];
}

const GroupList = (props: GroupListProps) => {
	const { userId, members } = props;
	// const { loading, data } = useGetGroupsByUserQuery({ variables: { userId } });

	return (
		<Fragment>
			<div className='max-w-sm rounded shadow-lg'>
				<div className='px-6 py-4'>
					<h2></h2>
					<div className='font-bold text-xl mb-2'></div>
					<ul className='accordion text-center'>
						{members.length > 0 ? (
							members.map((member, index) => {
								return (
									<li key={index}>{`${member.first_name} ${member.last_name}`}</li>
								);
							})
						) : (
							<li>"No members added"</li>
						)}
					</ul>
				</div>
			</div>
		</Fragment>
	);
};

export default GroupList;
