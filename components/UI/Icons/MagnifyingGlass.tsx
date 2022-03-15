const MagnifyingGlass = () => {
	return (
		<div className='text-gray-500 absolute ml-4 inset-0 m-auto w-4 h-4'>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				className='icon icon-tabler icon-tabler-search'
				width={16}
				height={16}
				viewBox='0 0 24 24'
				strokeWidth={1}
				stroke='#A0AEC0'
				fill='none'
				strokeLinecap='round'
				strokeLinejoin='round'
			>
				<path fill='currentColor' stroke='none' d='M0 0h24v24H0z' />
				<circle cx={10} cy={10} r={7} />
				<line x1={21} y1={21} x2={15} y2={15} />
			</svg>
		</div>
	);
};

export default MagnifyingGlass;
