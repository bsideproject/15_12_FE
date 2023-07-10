'use client';

import React, { useState } from 'react';

import Logo from 'public/images/activity-logo.svg';
import MoodCheckin01 from 'public/images/mood-checkin-icon01.svg';
import MoodCheckin02 from 'public/images/mood-checkin-icon02.svg';
import MoodCheckin03 from 'public/images/mood-checkin-icon03.svg';
import MoodCheckin04 from 'public/images/mood-checkin-icon04.svg';
import MoodCheckin05 from 'public/images/mood-checkin-icon05.svg';

import EIIconInput from '../elements/EIIconInput';
import ElButton from '../elements/ElButton';
import ElGrid from '../elements/ElGrid';
import ActivityHead from '../modules/ActivityHead';

export default function ScreenPick() {
	const [moodNum, setMoodNum] = useState<string>('');

	const iconArr: React.ReactElement<React.SVGProps<SVGSVGElement>>[] = [
		<MoodCheckin01 key="MoodCheckin01" />,
		<MoodCheckin02 key="MoodCheckin02" />,
		<MoodCheckin03 key="MoodCheckin03" />,
		<MoodCheckin04 key="MoodCheckin04" />,
		<MoodCheckin05 key="MoodCheckin05" />,
	];

	return (
		<ElGrid between bottomSm>
			<div>
				<ActivityHead title="기분 체크인" />
				<p className="text-p2 text-gray070 mt-[4.49%] mb-[13.46%]">오늘의 기분을 말해주세요</p>
				<Logo className="mx-auto mb-[13.62%]" />
				<div>
					{iconArr.map((el, i) => {
						return (
							<EIIconInput
								key={`${el.key}`}
								icon={el}
								value={`${i}점`}
								_onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									setMoodNum(e.target.value);
								}}
								_onDoubleClick={() => {
									console.log('s');
								}}
								answer={moodNum === `${i}점` ? 'border-blue050 text-blue050' : 'border-gray020'}
							/>
						);
					})}
				</div>
			</div>
			<ElButton type="button">제출하기</ElButton>
		</ElGrid>
	);
}
