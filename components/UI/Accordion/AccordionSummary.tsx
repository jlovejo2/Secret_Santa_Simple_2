import { PlusIcon } from '../Icons';
import { Tooltip } from '../Tooltip';

interface additionIconType {
	icon: JSX.Element;
	tooltipContent: String;
	tooltipDirection: String;
	onClick: () => void;
}

interface AccordionSummaryProps {
	title: string;
	expandIcon: any;
	expandDetails: boolean;
	additionalIcons: additionIconType[];
	handleExpand: () => void;
}

const AccordionSummary = (props: AccordionSummaryProps) => {
	const {
		title,
		expandIcon,
		expandDetails,
		additionalIcons,
		handleExpand
	} = props;

	return (
		<div
			className={`grid grid-cols-${additionalIcons.length} justify-between px-2 py-4`}
		>
			<div className='flex justify-center font-bold'>{title}</div>
			<div className='flex justify-end'>
				{additionalIcons.length > 0
					? additionalIcons.map((icon: additionIconType) => {
							return (
								<Tooltip
									content={icon.tooltipContent}
									direction={icon.tooltipDirection}
								>
									<div onClick={icon.onClick}>{icon.icon}</div>
								</Tooltip>
							);
					  })
					: null}
				<Tooltip
					content={`Click to ${expandDetails ? 'Minimize' : 'Expand'}`}
					direction={'top'}
				>
					<div onClick={handleExpand}>{expandIcon}</div>
				</Tooltip>
			</div>
		</div>
	);
};

export default AccordionSummary;
