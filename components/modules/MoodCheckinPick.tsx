'use client';

import React from 'react';

import moodCheckinArr from '@/constants/moodCheckinArr';
import Logo from 'public/images/activity-logo.svg';

import ElButton from '../elements/ElButton';
import ElGrid from '../elements/ElGrid';

import ActivityHead from './ActivityHead';

interface MoodCheckinPickProps {
	onChangePickMood: (value: number) => void;
	onSendPickMood: () => void;
	moodNum: number;
}

export default function MoodCheckinPick({ onChangePickMood, onSendPickMood, moodNum }: MoodCheckinPickProps) {
	return (
		<ElGrid between pxNone bottomSm>
			<div className="mb-[8.89%]">
				<div className="px-[6.67%]">
					<ActivityHead title="기분 체크인" />
					<p className="text-p2 text-gray070 mt-[4.49%] mb-[13.46%]">오늘의 기분을 말해주세요</p>
					<Logo className="mx-auto mb-[9.72%]" />
				</div>
				<ul className="bg-gray000 border border-gray020 px-[6.70%] py-[6.15%] [&>li:not(:last-child)]:mb-[1%]">
					{moodCheckinArr.map((el, i) => {
						return (
							<li key={`${el.key}`}>
								<button
									type="button"
									onClick={() => onChangePickMood(i + 1)}
									className={`border border-gray020 rounded px-[5.84%] py-[2.92%] w-full flex items-center ${
										moodNum === i + 1 ? '!border-blue050 text-h7 text-blue050' : 'border-gray020 text-p2 text-gray020'
									}`}
								>
									<div
										className={`mr-[8px] ${
											moodNum === i + 1
												? '[&>svg>path]:fill-blue050 [&>svg>g>path]:fill-blue050'
												: '[&>svg>path]:fill-gray020 [&>svg>g>path]:fill-gray020'
										}`}
									>
										{el}
									</div>
									{`${i + 1}점`}
								</button>
							</li>
						);
					})}
				</ul>
			</div>
			<div className="px-[6.67%]">
				<ElButton type="button" _onClick={onSendPickMood}>
					제출하기
				</ElButton>
			</div>
		</ElGrid>
	);
}
