'use client';

import React, { useState } from 'react';

import Logo from 'public/images/activity-logo.svg';
import MoodCheckin01 from 'public/images/mood-checkin-icon01.svg';
import MoodCheckin02 from 'public/images/mood-checkin-icon02.svg';
import MoodCheckin03 from 'public/images/mood-checkin-icon03.svg';
import MoodCheckin04 from 'public/images/mood-checkin-icon04.svg';
import MoodCheckin05 from 'public/images/mood-checkin-icon05.svg';

import ElButton from '../elements/ElButton';
import ElGrid from '../elements/ElGrid';
import ActivityHead from '../modules/ActivityHead';

export default function ScreenPick() {
	const [moodNum, setMoodNum] = useState<string>('');

	const onChangMood = (value: string) => {
		setMoodNum(value);
	};

	const iconArr: React.ReactElement<React.SVGProps<SVGSVGElement>>[] = [
		<MoodCheckin01 key="MoodCheckin01" />,
		<MoodCheckin02 key="MoodCheckin02" />,
		<MoodCheckin03 key="MoodCheckin03" />,
		<MoodCheckin04 key="MoodCheckin04" />,
		<MoodCheckin05 key="MoodCheckin05" />,
	];

	return (
		<ElGrid autoHeight pxNone bottomSm>
			<div className="mb-[8.89%]">
				<div className="px-[6.67%]">
					<ActivityHead title="기분 체크인" />
					<p className="text-p2 text-gray070 mt-[4.49%] mb-[13.46%]">오늘의 기분을 말해주세요</p>
					<Logo className="mx-auto mb-[13.62%]" />
				</div>
				<ul className="bg-gray000 border border-gray020 px-[6.70%] py-[6.15%] [&>li:not(:last-child)]:mb-[1%]">
					{iconArr.map((el, i) => {
						return (
							<li key={`${el.key}`}>
								<button
									type="button"
									onClick={() => onChangMood(`${i + 1}점`)}
									className={`border border-gray020 rounded px-[5.84%] py-[2.92%] w-full flex items-center ${
										moodNum === `${i + 1}점`
											? '!border-blue050 text-h7 text-blue050'
											: 'border-gray020 text-p2 text-gray020'
									}`}
								>
									<div
										className={`mr-[8px] ${
											moodNum === `${i + 1}점`
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
				<ElButton type="button">제출하기</ElButton>
			</div>
		</ElGrid>
	);
}
