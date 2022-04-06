interface MagnifyingGlassProps {
	width: number;
	height: number;
	currentColor?: string;
}

const MagnifyingGlass = (props: MagnifyingGlassProps) => {
	const { width, height, currentColor } = props;

	return (
		<div>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				className='icon icon-tabler icon-tabler-search'
				width={width}
				height={height}
				viewBox='0 0 24 24'
				strokeWidth={2}
				stroke='#A0AEC0'
				fill='none'
				strokeLinecap='round'
				strokeLinejoin='round'
			>
				<path
					fill={currentColor ? 'currentColor' : ''}
					stroke='none'
					d='M0 0h24v24H0z'
				/>
				<circle cx={10} cy={10} r={7} />
				<line x1={21} y1={21} x2={15} y2={15} />
			</svg>
		</div>
	);
};

export default MagnifyingGlass;
