import React from 'react';
import { MagnifyingGlassIcon } from '../Icons';

interface searchbarProps {
	placeholder: string;
}

const Searchbar = (props: searchbarProps) => {
	const { placeholder } = props;

	return (
		<div className='pt-2 relative mx-auto text-gray-600'>
			<input
				className='border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none'
				type='search'
				name='search'
				placeholder={placeholder}
			/>
			<button type='submit' className='absolute right-0 top-0 mt-4 mr-4'>
				<MagnifyingGlassIcon width={25} height={25} />
			</button>
		</div>
	);
};

export default Searchbar;
