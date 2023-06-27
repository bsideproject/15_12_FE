'use client';

import ACTIVITY_FIGCAPTION from '@/constants/activityFigcaption';
import clsxm from '@/service/mergeStyle';

interface ActivityListProps {
	data: {
		activity_id: number;
		display_name: string;
		description: string;
	}[];
}

export default function ActivityList({ data }: ActivityListProps) {
	const listWrapClasses = clsxm(
		'flex justify-between items-center flex-wrap [&>li:not(:nth-child(3),:nth-child(4))]:mb-[6.41%]',
	);

	return (
		<ul className={listWrapClasses}>
			{data?.map((activity) => {
				return (
					<li
						key={activity.activity_id}
						className="w-[calc(50%-8px)] text-center border border-gray020 rounded overflow-hidden"
					>
						<div
							className="flex items-center justify-center"
							style={{ backgroundColor: `${ACTIVITY_FIGCAPTION[activity.display_name]?.color}` }}
						>
							{ACTIVITY_FIGCAPTION[activity.display_name]?.icon}
						</div>
						<div className="py-[10.96%] px-[13.70%] bg-gray000">
							<h3 className="text-h7 text-gray090 mb-[7.55%]">{activity.display_name}</h3>
							<p className="text-p3 text-gray070">{activity.description}</p>
						</div>
					</li>
				);
			})}
		</ul>
	);
}
