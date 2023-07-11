'use client';

import ElButton from '../elements/ElButton';
import ElGrid from '../elements/ElGrid';

import ActivityHead from './ActivityHead';

interface ThankListProps {
	position: string;
	handleStep: (value: string) => void;
}

export default function ThankList({ position, handleStep }: ThankListProps) {
	return (
		<ElGrid between pxNone bottomSm>
			<div>
				<div className="px-[6.67%]">
					<ActivityHead title="감사 서클" />
					<p className="text-p2 text-gray070 mt-[4.49%] mb-[5.45%]">
						이번주 고마운 일이 있었던 사람에게
						<br />
						마음을 전해요!
					</p>
				</div>
				<div className="bg-gray000 border border-gray020 px-[6.70%] py-[6.15%] [&>div:not(:last-child)]:mb-[1%]">
					<h3 className="text-h7 text-gray090 mb-[3.21%]">참여자 리스트 </h3>
					{[1, 2, 3, 4, 5, 6].map((el, i) => {
						return (
							<div
								key={`${el}`}
								className="border border-gray020 rounded px-[5.84%] py-[2.92%] w-full flex items-center text-p2 text-gray020"
							>
								<span className="text-h7 text-gray090 mr-[10px]">{el}</span>
								닉네임
							</div>
						);
					})}
				</div>
			</div>
			{position === 'organizer' && (
				<div className="px-[6.67%]">
					<ElButton type="button" _onClick={() => handleStep('GUIDE_THANKS_TO')}>
						순서 섞기
					</ElButton>
				</div>
			)}
		</ElGrid>
	);
}
