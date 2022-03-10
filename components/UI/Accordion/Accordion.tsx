import { Fragment, useState } from 'react';
import { MinusIcon } from '../Icons';
import { default as AccordionDetails } from './AccordionDetails';
import { default as AccordionSummary } from './AccordionSummary';

interface AccordionProps {
	children: React.ReactNode;
	expandIcon: any;
	additionalIcons: any;
	title: string;
}

const Accordion = (props: AccordionProps) => {
	const { children, title, expandIcon, additionalIcons } = props;
	const [expandDetails, setExpandDetails] = useState(false);

	const handleAccordionExpand = () => {
		setExpandDetails(!expandDetails);
	};

	return (
		<Fragment>
			<div className='accordion'>
				<AccordionSummary
					expandIcon={
						expandDetails ? <MinusIcon width={15} height={15} /> : expandIcon
					}
					additionalIcons={additionalIcons}
					title={title}
					handleExpand={() => handleAccordionExpand()}
				/>
				<AccordionDetails expandDetails={expandDetails}>
					{children}
				</AccordionDetails>
			</div>
		</Fragment>
	);
};

export default Accordion;
