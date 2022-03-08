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
		<div className='grid grid-cols-2 justify-between px-2 py-4'>
			<div className='flex justify-center font-bold'>{title}</div>
			<div className='flex justify-end'>
				<span className='pl-2' onClick={handleAddGroupMember}>
					{addGroupMemberIcon}
				</span>
				<span className='pl-2' onClick={handleExpand}>
					{expandIcon}
				</span>
			</div>
		</div>
	);
};

export default AccordionSummary;
