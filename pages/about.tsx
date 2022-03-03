import React from 'react';
import { Layout } from '@components/index';

const Index = () => {
	return (
		<>
			<Layout>
				<div>
					<p>
						{' '}
						Welcome to the Secret Santa App! If you are sick of drawing over and over
						to make sure no one picks their own name. Then this is the place to
						quickly create your group. Generate the picks <strong>
							SECRETLY
						</strong>{' '}
						and then send them out to all the group members.{' '}
					</p>
				</div>
			</Layout>
		</>
	);
};

export default Index;
