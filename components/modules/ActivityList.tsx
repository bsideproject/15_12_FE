'use client';

import ACTIVITY_FIGCAPTION from '@/constants/activityFigcaption';
import useNavigation from '@/hooks/useNavigation';
import clsxm from '@/service/mergeStyle';

interface ActivityListProps {
	data: {
		activity_id: number;
		display_name: string;
		description: string;
	}[];
	user: string | boolean;
}

export default function ActivityList({ data, user }: ActivityListProps) {
	const navigation = useNavigation();

	const activityRoutes = (activity: any) => {
		if (!user) {
			alert('로그인 후 이용 가능합니다!');
			navigation.push('/login');
		} else {
			switch (activity.display_name) {
				case '스피드게임':
					navigation.push('/speed-game');
					break;
				case '기분 체크인':
					navigation.push('/mood-checkin');
					break;
				case '감사 서클':
					navigation.push('/thank-circle');
					break;
				case '미니 네트워킹':
					alert('준비 중...');
					break;
				default:
					break;
			}
		}
	};

	const listWrapClasses = clsxm(
		'flex justify-between items-center flex-wrap [&>li:not(:nth-child(3),:nth-child(4))]:mb-[6.41%]',
	);
	const cardClasses = clsxm('w-[calc(50%-8px)] text-center border border-gray020 rounded overflow-hidden');

	return (
		<ul className={listWrapClasses}>
			{data?.map((activity) => {
				return (
					<li key={activity.activity_id} className={cardClasses}>
						<button type="button" className="w-full" onClick={() => activityRoutes(activity)}>
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
						</button>
					</li>
				);
			})}
		</ul>
	);
}
