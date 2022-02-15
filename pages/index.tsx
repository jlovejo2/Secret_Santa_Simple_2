import {
	useState,
	ChangeEvent,
	SyntheticEvent,
	useEffect,
	FormEvent
} from 'react';
import { Layout } from '../components/Layout';
import { Hero } from '../components/UI';

const Index = () => {
	return (
		<>
			<Layout grid={true}>
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
