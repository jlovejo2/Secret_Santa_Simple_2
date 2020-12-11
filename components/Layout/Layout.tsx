import React from 'react';
import { Navbar } from '../Navbar';
import { Footer } from '../Footer';

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
			<div>
				<Footer />
			</div>
		</>
	);
};

export default Layout;
