import { gql } from '@apollo/client';
import { GroupCombined } from '../components';
import { useState } from 'react';
import { Layout } from '../components/Layout';
import { Sidebar } from '../components/Sidebar';
import { DashboardMenuBar } from '../components/DashboardMenuBar';

const SecretSantaGroups = () => {
	const [show, setShow] = useState(false);
	const [profile, setProfile] = useState(false);

	return (
		<>
			<Layout>
				<div className='w-full h-full bg-gray-200'>
					<div className='flex flex-no-wrap'>
						<Sidebar showSidebar={show} setSidebar={() => setShow(!show)} />
						<div className='w-full'>
							<DashboardMenuBar
								showDashboardMenu={show}
								setShowDashboardMenu={() => setShow(!show)}
								showProfile={profile}
								setShowProfile={() => setProfile(!profile)}
							/>
							{/* Remove class [ h-64 ] when adding a card block */}
							<div className='container mx-auto py-10 h-64 md:w-4/5 w-11/12 px-6'>
								{/* Remove class [ border-dashed border-2 border-gray-300 ] to remove dotted border */}
								<div className='w-full h-full rounded'>
									<GroupCombined />
								</div>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		</>
	);
};

export default SecretSantaGroups;
