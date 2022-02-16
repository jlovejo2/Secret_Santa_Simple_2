import React from 'react';
import {
	AlertBellIcon,
	CloseMenuIcon,
	DashboardIcon,
	GiftboxIcon,
	GroupIcon,
	HandshakeIcon,
	MagnifyingGlassIcon,
	MessagesIcon
} from '../UI/Icons';

interface SidebarProps {
	showSidebar: boolean;
	setSidebar: () => void;
}

const Sidebar = (props: SidebarProps) => {
	const { showSidebar, setSidebar } = props;

	return (
		<>
			<div className='absolute lg:relative w-64 h-screen shadow bg-gray-100 hidden lg:block'>
				{/* <div className="h-16 w-full flex items-center px-8">
                Placement for possible logo like icon
            	</div> */}
				<ul aria-orientation='vertical' className=' py-6'>
					<li className='pl-6 cursor-pointer text-white text-sm leading-3 tracking-normal pb-4 pt-5 text-indigo-700 focus:text-indigo-700 focus:outline-none'>
						<div className='flex items-center'>
							<DashboardIcon />
							<span className='ml-2'>Dashboard</span>
						</div>
					</li>
					<li className='pl-6 cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-4 mb-4 py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none'>
						<div className='flex items-center'>
							<HandshakeIcon />
							<span className='ml-2'>Friends</span>
						</div>
					</li>
					<li className='pl-6 cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mb-4 py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none'>
						<a href='/secret-santa-groups' className='flex items-center'>
							<GroupIcon />
							<span className='ml-2'>Secret Santa Groups</span>
						</a>
					</li>
					<li className='pl-6 cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none'>
						<div className='flex items-center'>
							<GiftboxIcon />
							<span className='ml-2'>Wishlist</span>
						</div>
					</li>
				</ul>
			</div>
			{/*Mobile responsive sidebar*/}
			<div
				className={
					showSidebar
						? 'w-full h-full absolute z-40  transform  translate-x-0 '
						: '   w-full h-full absolute z-40  transform -translate-x-full'
				}
				id='mobile-nav'
			>
				<div
					className='bg-gray-800 opacity-50 absolute h-full w-full lg:hidden'
					onClick={setSidebar}
				/>
				<div className='absolute z-40 sm:relative w-64 md:w-96 shadow pb-4 bg-gray-100 lg:hidden transition duration-150 ease-in-out h-full'>
					<div className='flex flex-col justify-between h-full w-full'>
						<div>
							<div className='flex items-center justify-end px-8'>
								<div
									id='closeSideBar'
									className='flex items-center justify-center h-10 w-10'
									onClick={setSidebar}
								>
									<CloseMenuIcon />
								</div>
							</div>
							<ul aria-orientation='vertical' className=' py-6'>
								<li className='pl-6 cursor-pointer text-white text-sm leading-3 tracking-normal pb-4 pt-5 text-indigo-700 focus:text-indigo-700 focus:outline-none'>
									<div className='flex items-center'>
										<DashboardIcon />
										<span className='ml-2 xl:text-base md:text-2xl text-base'>
											Dashboard
										</span>
									</div>
								</li>
								<li className='pl-6 cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-4 mb-4 py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none'>
									<div className='flex items-center'>
										<div className='w-6 h-6 md:w-8 md:h-8'>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												className='icon icon-tabler icon-tabler-puzzle'
												viewBox='0 0 24 24'
												strokeWidth='1.5'
												stroke='currentColor'
												fill='none'
												strokeLinecap='round'
												strokeLinejoin='round'
											>
												<path stroke='none' d='M0 0h24v24H0z' />
												<path d='M4 7h3a1 1 0 0 0 1 -1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0 -1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h1a2 2 0 0 0 0 -4h-1a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1' />
											</svg>
										</div>
										<span className='ml-2 xl:text-base md:text-2xl text-base'>
											Products
										</span>
									</div>
								</li>
								<li className='pl-6 cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mb-4 py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none'>
									<div className='flex items-center'>
										<div className='w-6 h-6 md:w-8 md:h-8'>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												className='icon icon-tabler icon-tabler-compass'
												viewBox='0 0 24 24'
												strokeWidth='1.5'
												stroke='currentColor'
												fill='none'
												strokeLinecap='round'
												strokeLinejoin='round'
											>
												<path stroke='none' d='M0 0h24v24H0z' />
												<polyline points='8 16 10 10 16 8 14 14 8 16' />
												<circle cx={12} cy={12} r={9} />
											</svg>
										</div>
										<span className='ml-2 xl:text-base md:text-2xl text-base'>
											Performance
										</span>
									</div>
								</li>
								<li className='pl-6 cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none'>
									<div className='flex items-center'>
										<div className='w-6 h-6 md:w-8 md:h-8'>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												className='icon icon-tabler icon-tabler-code'
												viewBox='0 0 24 24'
												strokeWidth='1.5'
												stroke='currentColor'
												fill='none'
												strokeLinecap='round'
												strokeLinejoin='round'
											>
												<path stroke='none' d='M0 0h24v24H0z' />
												<polyline points='7 8 3 12 7 16' />
												<polyline points='17 8 21 12 17 16' />
												<line x1={14} y1={4} x2={10} y2={20} />
											</svg>
										</div>
										<span className='ml-2 xl:text-base md:text-2xl text-base'>
											Deliverables
										</span>
									</div>
								</li>
							</ul>
						</div>
						<div className='w-full'>
							<div className='flex justify-center mb-4 w-full px-6'>
								<div className='relative w-full'>
									<MagnifyingGlassIcon />
									<input
										className='bg-gray-200 focus:outline-none rounded w-full text-sm text-gray-500  pl-10 py-2'
										type='text'
										placeholder='Search'
									/>
								</div>
							</div>
							<div className='border-t border-gray-300'>
								<div className='w-full flex items-center justify-between px-6 pt-1'>
									<div className='flex items-center'>
										<img
											alt='profile-pic'
											src='https://tuk-cdn.s3.amazonaws.com/assets/components/boxed_layout/bl_1.png'
											className='w-8 h-8 rounded-md'
										/>
										<p className='md:text-xl text-gray-800 text-base leading-4 ml-2'>
											Jane Doe
										</p>
									</div>
									<ul className='flex'>
										<li className='cursor-pointer text-grey-500 pt-5 pb-3'>
											<MessagesIcon />
										</li>
										<li className='cursor-pointer text-grey-500 pt-5 pb-3 pl-3'>
											<AlertBellIcon />
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/*Mobile responsive sidebar*/}
		</>
	);
};

export default Sidebar;
