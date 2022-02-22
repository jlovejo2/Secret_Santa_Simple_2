import { PlusIcon } from '../Icons';

interface AccordionSummaryProps {
	title: string;
	expandIcon: any;
	handleExpand: () => void;
}

const AccordionSummary = (props: AccordionSummaryProps) => {
	const { title, expandIcon, handleExpand } = props;

	return (
		<div className='grid grid-cols-2 justify-between px-2 py-4'>
			<div className='flex justify-center font-bold'>{title}</div>
			<span className='flex justify-end' onClick={handleExpand}>
				{expandIcon}
			</span>
		</div>
	);
};

export default AccordionSummary;
