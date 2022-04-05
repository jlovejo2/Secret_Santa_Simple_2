import { useGetUserQuery } from '@src/graphql/types';
import { gql } from '@apollo/client';
import { Todo } from '../components';
import { useState, ChangeEvent, useEffect } from 'react';
import { Layout } from '@components/Layout';
import { Sidebar } from '@components/Sidebar';
import { DashboardMenuBar } from '@components/DashboardMenuBar';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import requireAuth from '@src/auth/requirePageAuth';

gql`
	query getUser {
		getUser {
			first_name
			last_name
			email
			groups {
				groupId
			}
		}
	}
`;

const Index = () => {
	const [show, setShow] = useState(false);
	const [profile, setProfile] = useState(false);
	const router = useRouter();
	const { data, loading, error } = useGetUserQuery({});

	useEffect(() => {
		if (error) router.push('/');
	}, [error]);

	return (
		<>
			<Layout>
				{/* <div className='col-start-2 col-span-4'>
					<GroupCombined />
				</div> */}
				<div className='w-full h-full bg-gray-200'>
					<div className='flex h-full flex-no-wrap'>
						<Sidebar showSidebar={show} setSidebar={() => setShow(!show)} />
						<div className='w-full'>
							<DashboardMenuBar
								showDashboardMenu={show}
								setShowDashboardMenu={() => setShow(!show)}
								showProfile={profile}
								setShowProfile={() => setProfile(!profile)}
							/>
							{/* Remove class [ h-64 ] when adding a card block */}
							<div className='container max-h-full mx-auto py-10 h-64 md:w-4/5 w-11/12 px-6'>
								{/* Remove class [ border-dashed border-2 border-gray-300 ] to remove dotted border */}
								<div className='w-full rounded border-dashed border-2 border-gray-300'>
									{!loading
										? 'Welcome to the Secret Santa App Dashboard'
										: 'still loading'}
								</div>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		</>
	);
};

// requireAuth(Index)

export default Index;
