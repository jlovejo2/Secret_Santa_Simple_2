import React, { useState } from 'react';

interface TooltipProps {
	delay?: number;
	children: JSX.Element;
	direction?: String;
	content: String;
}

const Tooltip = (props: TooltipProps) => {
	const { delay, children, direction, content } = props;

	let timeout;
	const [active, setActive] = useState(false);

	const showTip = () => {
		timeout = setTimeout(() => {
			setActive(true);
		}, delay || 400);
	};

	const hideTip = () => {
		clearInterval(timeout);
		setActive(false);
	};

	return (
		<div
			className='Tooltip-Wrapper'
			onMouseEnter={showTip}
			onMouseLeave={hideTip}
		>
			{children}
			{active && (
				<div className={`Tooltip-Tip ${direction || 'top'}`}>{content}</div>
			)}
		</div>
	);
};

export default Tooltip;
