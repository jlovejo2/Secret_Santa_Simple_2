import React, { useState } from 'react';
import { Navbar } from '../Navbar';
import { Footer } from '../Footer';
import { SignUpModal } from '../SignUp';
import { Sidebar } from '../Sidebar';

interface LayoutProps {
	children?: React.ReactNode;
	grid?: boolean;
	SidebarPresent?: boolean;
}

const Layout = (props: LayoutProps) => {
	const { children, grid = false, SidebarPresent = false } = props;
	const [showModal, setShowModal] = useState(false);
	const [showSidebar, setShowSidebar] = useState(false);

	const handleSignUPCLick = () => {
		console.log(showModal);
		setShowModal(true);
	};

	const SideBarElem = SidebarPresent ? (
		<Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
	) : null;

	return (
		<>
			<div>
				<Navbar handleSignUPCLick={handleSignUPCLick} />
			</div>
			<div
				className={`flex ${grid ? 'grid grid-cols-6 gap-2' : ''} justify-center`}
			>
				{children}
			</div>
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
