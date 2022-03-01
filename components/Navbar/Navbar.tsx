import React, { useState } from 'react';
import Link from 'next/link';

interface NavbarProps {
	handleSignUpClick: () => void;
	handleSignInClick: () => void;
}

const Navbar = (props: NavbarProps) => {
	const { handleSignUpClick, handleSignInClick } = props;

	return (
		<div className='relative bg-red-500'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6'>
				<div className='flex justify-between items-center py-6 md:justify-start md:space-x-10'>
					<nav className='hidden md:flex space-x-10'>
						<Link href='/dashboard'>
							<a className='text-base font-medium text-white hover:text-gray-900'>
								Secret Santa
							</a>
						</Link>
						<Link href='/about'>
							<a className='text-base font-medium text-white hover:text-gray-900'>
								About
							</a>
						</Link>
					</nav>
					<div className='hidden md:flex items-center justify-end md:flex-1 lg:w-0'>
						<a
							onClick={handleSignInClick}
							className='whitespace-nowrap text-base font-medium text-white hover:text-gray-900'
						>
							Sign in
						</a>
						<a
							onClick={handleSignUpClick}
							className='ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-indigo-700'
						>
							Sign up
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
