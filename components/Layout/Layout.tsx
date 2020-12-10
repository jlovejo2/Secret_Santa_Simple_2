import React from 'react';
import { Navbar } from '../Navbar';

interface LayoutProps {
	children?: JSX.Element;
}

const Layout = props => {
	const { children } = props;

	return (
		<>
			<div>
				<Navbar />
			</div>
			<div className='flex grid grid-cols-6 gap-2 justify-center'>{children}</div>
		</>
	);
};

export default Layout;
