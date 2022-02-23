import React from 'react';
import {
	AlertBellIcon,
	HamburgerMenuTwoBar,
	LogoutIcon,
	MagnifyingGlassIcon,
	MessagesIcon,
	ProfileIcon
} from '../UI/Icons';
import DownArrow from '../UI/Icons/DownArrow';

interface DashboardMenuBarProps {
	showDashboardMenu: boolean;
	showProfile: boolean;
	setShowDashboardMenu: () => void;
	setShowProfile: () => void;
}

const DashboardMenuBar = (props: DashboardMenuBarProps) => {
	const {
		showDashboardMenu,
		showProfile,
		setShowDashboardMenu,
		setShowProfile
	} = props;

	return (
		<nav className='h-16 flex items-center lg:items-stretch justify-end lg:justify-between bg-white shadow relative z-1'>
			<div className='hidden lg:flex w-full pr-6'>
				<div className='w-1/2 h-full hidden lg:flex items-center pl-6 pr-24'>
					<div className='relative w-full'>
						<div className='text-gray-500 absolute ml-4 inset-0 m-auto w-4 h-4'>
							<MagnifyingGlassIcon />
						</div>
						<input
							className='border border-gray-100 focus:outline-none focus:border-indigo-700 rounded w-full text-sm text-gray-500 bg-gray-100 pl-12 py-2'
							type='text'
							placeholder='Search'
						/>
					</div>
				</div>
				<div className='w-1/2 hidden lg:flex'>
					<div className='w-full flex items-center pl-8 justify-end'>
						<div className='h-full w-20 flex items-center justify-center border-r border-l'>
							<div className='relative cursor-pointer text-gray-600'>
								<AlertBellIcon />
								<div className='w-2 h-2 rounded-full bg-red-400 border border-white absolute inset-0 mt-1 mr-1 m-auto' />
							</div>
						</div>
						<div className='h-full w-20 flex items-center justify-center border-r mr-4 cursor-pointer text-gray-600'>
							<MessagesIcon />
						</div>
						<div
							className='flex items-center relative cursor-pointer'
							onClick={setShowProfile}
						>
							<div className='rounded-full'>
								{showProfile ? (
									<ul className='p-2 w-full border-r bg-white absolute rounded left-0 shadow mt-12 sm:mt-16 '>
										<li className='flex w-full justify-between text-gray-600 hover:text-indigo-700 cursor-pointer items-center'>
											<div className='flex items-center'>
												<ProfileIcon />
												<span className='text-sm ml-2'>My Profile</span>
											</div>
										</li>
										<li className='flex w-full justify-between text-gray-600 hover:text-indigo-700 cursor-pointer items-center mt-2'>
											<div className='flex items-center'>
												<LogoutIcon />
												<span className='text-sm ml-2'>Sign out</span>
											</div>
										</li>
									</ul>
								) : (
									''
								)}
								<div className='relative'>
									<img
										className='rounded-full h-10 w-10 object-cover'
										src='https://tuk-cdn.s3.amazonaws.com/assets/components/sidebar_layout/sl_1.png'
										alt='avatar'
									/>
									<div className='w-2 h-2 rounded-full bg-green-400 border border-white absolute inset-0 mb-0 mr-0 m-auto' />
								</div>
							</div>
							<p className='text-gray-800 text-sm mx-3'>Jane Doe</p>
							<div className='cursor-pointer text-gray-600'>
								<DownArrow />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div
				className='text-gray-600 mr-8 visible lg:hidden relative'
				onClick={setShowDashboardMenu}
			>
				{showDashboardMenu ? ' ' : <HamburgerMenuTwoBar />}
			</div>
		</nav>
	);
};

export default DashboardMenuBar;
