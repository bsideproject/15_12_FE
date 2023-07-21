'use client';

import ElButton from '../elements/ElButton';
import ElGrid from '../elements/ElGrid';

import ActivityHead from './ActivityHead';

interface MiniNetworkingListProps {
	position: string;
	handleGropMatching: () => void;
	participantList: string[];
}

export default function MiniNetworkingList({ position, handleGropMatching, participantList }: MiniNetworkingListProps) {
	return (
		<ElGrid between pxNone bottomSm>
			<div>
				<div className="px-[6.67%]">
					<ActivityHead title="미니 네트워킹" />
					<p className="text-p2 text-gray070 mt-[4.49%] mb-[5.45%]">
						이번주 고마운 일이 있었던 사람에게
						<br />
						마음을 전해요!
					</p>
				</div>
				<div className="bg-gray000 border border-gray020 px-[6.70%] py-[6.15%] [&>div:not(:last-child)]:mb-[1%]">
					<h3 className="text-h7 text-gray090 mb-[3.21%]">참여자 리스트 </h3>
					{participantList?.map((el, i) => {
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
			{position === 'organizer' && (
				<div className="px-[6.67%]">
					<ElButton type="button" _onClick={handleGropMatching}>
						그룹 구성하기
					</ElButton>
				</div>
			)}
		</ElGrid>
	);
}
