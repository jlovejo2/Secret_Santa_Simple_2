import { useState } from 'react';

interface AccordionDetailsProps {
	children: React.ReactNode;
	expandDetails: boolean;
}

const AccordionDetails = (props: AccordionDetailsProps) => {
	const { children, expandDetails } = props;

	return (
		<div className={`px-4 py-4 ${expandDetails ? 'block' : 'hidden'}`}>
			{children}
		</div>
	);
};

export default AccordionDetails;
