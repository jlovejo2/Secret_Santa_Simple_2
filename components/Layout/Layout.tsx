import React, { useState } from 'react';
import { Navbar } from '../Navbar';
import { Footer } from '../Footer';
import { SignUpModal } from '../SignUp';

interface LayoutProps {
	children?: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
	const { children } = props;
	const [showModal, setShowModal] = useState(false);

	const handleSignUPCLick = () => {
		console.log(showModal);
		setShowModal(true);
	};

	return (
		<>
			<div>
				<Navbar handleSignUPCLick={handleSignUPCLick} />
			</div>
			<div className='flex grid grid-cols-6 gap-2 justify-center'>{children}</div>
			<SignUpModal
				onClose={() => setShowModal(false)}
				show={showModal}
				title={'Sign Up'}
			/>
			<div>
				<Footer className={'bg-green-500'} />
			</div>
		</>
	);
};

export default Layout;
