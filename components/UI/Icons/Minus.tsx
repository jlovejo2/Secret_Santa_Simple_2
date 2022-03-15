interface MinusIconProps {
	width: number;
	height: number;
}

const Minus = (props: MinusIconProps) => {
	const { width, height } = props;

	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 448 512'
			width={width}
			height={height}
		>
			<path
				fill='currentColor'
				d='M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z'
			/>
		</svg>
	);
};

export default Minus;
