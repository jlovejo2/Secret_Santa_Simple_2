import React, { useState } from 'react';
import { Navbar } from '../Navbar';
import { Footer } from '../Footer';
import { SignUpModal } from '../SignUp';
import { SignInModal } from '../SignIn';

interface LayoutProps {
	children?: React.ReactNode;
	grid?: boolean;
	openSignIn?: boolean;
	SidebarPresent?: boolean;
}

const Layout = (props: LayoutProps) => {
	const { children, grid = false, SidebarPresent = false, openSignIn } = props;
	const [showSignUpModal, setShowSignUpModal] = useState(false);
	const [showSignInModal, setShowSignInModal] = useState(
		openSignIn ? openSignIn : false
	);
	const [showSidebar, setShowSidebar] = useState(false);

	const handleSignUpClick = () => {
		setShowSignUpModal(true);
	};

	const handleSignInClick = () => {
		console.log('Log In Modal', showSignInModal);
		setShowSignInModal(true);
	};

	// const SideBarElem = SidebarPresent ? (
	// 	<Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
	// ) : null;

	return (
		<>
			<div>
				<Navbar
					handleSignUpClick={handleSignUpClick}
					handleSignInClick={handleSignInClick}
				/>
			</div>
			<div
				className={`flex ${grid ? 'grid grid-cols-6 gap-2' : ''} justify-center`}
			>
				{children}
			</div>
			<SignUpModal
				onClose={() => setShowSignUpModal(false)}
				show={showSignUpModal}
				title={'Sign Up'}
			/>
			<SignInModal
				onClose={() => setShowSignInModal(false)}
				show={showSignInModal}
				title={'Log In'}
			/>
			<div>
				<Footer className={'bg-green-500'} />
			</div>
		</>
	);
};

export default Layout;
