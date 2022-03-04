import { PlusIcon } from '../Icons';

interface AccordionSummaryProps {
	title: string;
	expandIcon: any;
	addGroupMemberIcon: any;
	handleExpand: () => void;
	handleAddGroupMember: () => void;
}

const AccordionSummary = (props: AccordionSummaryProps) => {
	const {
		title,
		expandIcon,
		addGroupMemberIcon,
		handleExpand,
		handleAddGroupMember
	} = props;

	return (
		<div className='grid grid-cols-3 justify-between px-2 py-4'>
			<div className='flex justify-center font-bold'>{title}</div>
			<span className='flex justify-end' onClick={handleAddGroupMember}>
				{addGroupMemberIcon}
			</span>
			<span className='flex justify-end' onClick={handleExpand}>
				{expandIcon}
			</span>
		</div>
	);
};

export default AccordionSummary;
