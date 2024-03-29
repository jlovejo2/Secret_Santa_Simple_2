import {
	useState,
	ChangeEvent,
	SyntheticEvent,
	useEffect,
	FormEvent
} from 'react';
import { Layout } from '@components/index';
import { Hero } from '@components/UI';

interface indexPageProps {
	openSignIn?: boolean;
}

const Index = (props: indexPageProps) => {
	const { openSignIn } = props;

	return (
		<>
			<Layout grid={true} openSignIn>
				<Hero
					headline={'Welcome to Secret Santa App!'}
					description={
						'Create a secret santa group, make you picks with one click of a button, and annonomously send the pick to each group member!'
					}
				/>
				<div className='col-start-2 col-span-4'></div>
			</Layout>
		</>
	);
};

export default Index;
