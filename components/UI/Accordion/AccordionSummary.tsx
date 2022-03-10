import { PlusIcon } from '../Icons';

interface additionIconType {
	icon: JSX.Element;
	onClick: () => void;
}

interface AccordionSummaryProps {
	title: string;
	expandIcon: any;
	additionalIcons: additionIconType[];
	handleExpand: () => void;
}

const AccordionSummary = (props: AccordionSummaryProps) => {
	const { title, expandIcon, additionalIcons, handleExpand } = props;

	return (
		<div
			className={`grid grid-cols-${additionalIcons.length} justify-between px-2 py-4`}
		>
			<div className='flex justify-center font-bold'>{title}</div>
			<div className='flex justify-end'>
				{additionalIcons.length > 0
					? additionalIcons.map((icon: additionIconType) => {
							return (
								<span className='pl-2' onClick={icon.onClick}>
									{icon.icon}
								</span>
							);
					  })
					: null}
				<span className='pl-2' onClick={handleExpand}>
					{expandIcon}
				</span>
			</div>
		</div>
	);
};

export default AccordionSummary;
