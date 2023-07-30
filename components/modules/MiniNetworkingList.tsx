'use client';

import ActivityIcon04 from 'public/images/activity04-icon.svg';

import ElButton from '../elements/ElButton';
import ElGrid from '../elements/ElGrid';

import ActivityHead from './ActivityHead';
import GameImage from './GameImage';

interface MiniNetworkingListProps {
	position: string;
	handleGroupMatching: () => void;
	participantList: string[];
}

export default function MiniNetworkingList({
	position,
	handleGroupMatching,
	participantList,
}: MiniNetworkingListProps) {
	return (
		<ElGrid between pxNone bottomSm>
			<div>
				<div className="px-[6.67%] mb-[3.89%]">
					<ActivityHead title="미니 네트워킹" />
				</div>
				<div>
					<GameImage bg="bg-[#D0CADD]" svg={<ActivityIcon04 />} />
					<div className="bg-gray000 border border-gray020 px-[6.70%] py-[6.15%] [&>div:not(:last-child)]:mb-[2%]">
						<h3 className="text-h7 text-gray090 mb-[3.21%]">참여자 리스트 </h3>
						{participantList?.map((el) => {
							return (
								<div
									key={`${el}`}
									className="border border-gray020 rounded px-[5.84%] py-[2.92%] w-full flex items-center text-p2 text-gray020"
								>
									{el}
								</div>
							);
						})}
					</div>
				</div>
			</div>
			{position === 'organizer' && (
				<div className="px-[6.67%]">
					<ElButton type="button" _onClick={handleGroupMatching}>
						그룹 구성하기
					</ElButton>
				</div>
			)}
		</ElGrid>
	);
}
