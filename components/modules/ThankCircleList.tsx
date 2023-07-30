'use client';

import ActivityIcon03 from 'public/images/activity03-icon.svg';

import ElButton from '../elements/ElButton';
import ElGrid from '../elements/ElGrid';

import ActivityHead from './ActivityHead';
import GameImage from './GameImage';

interface ThankCircleListProps {
	position: string;
	handleStep: () => void;
	nicknameList: string[];
}

export default function ThankCircleList({ position, handleStep, nicknameList }: ThankCircleListProps) {
	return (
		<ElGrid between pxNone bottomSm>
			<div>
				<div className="px-[6.67%] mb-[3.89%]">
					<ActivityHead title="감사 서클" />
				</div>
				<GameImage bg="bg-[#CAD1DD]" svg={<ActivityIcon03 />} />
				<div className="bg-gray000 border border-gray020 px-[6.70%] py-[6.15%] [&>div:not(:last-child)]:mb-[2%]">
					<h3 className="text-h7 text-gray090 mb-[3.21%]">참여자 리스트 </h3>
					{nicknameList?.map((el, i) => {
						return (
							<div
								key={`${el}`}
								className="border border-gray020 rounded px-[5.84%] py-[2.92%] w-full flex items-center text-p2 text-gray020"
							>
								<span className="text-h7 text-gray090 mr-[10px]">{i + 1}</span>
								{el}
							</div>
						);
					})}
				</div>
			</div>
			{position === 'organizer' && (
				<div className="px-[6.67%]">
					<ElButton type="button" _onClick={handleStep}>
						순서 섞기
					</ElButton>
				</div>
			)}
		</ElGrid>
	);
}
