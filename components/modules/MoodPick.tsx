'use client';

import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import userNickname from '@/atoms/userNickname';
import moodCheckinArr from '@/constants/moodCheckinArr';
import useNavigation from '@/hooks/useNavigation';
import useTest from '@/hooks/useTest';
import Logo from 'public/images/activity-logo.svg';

import ElButton from '../elements/ElButton';
import ElGrid from '../elements/ElGrid';

import ActivityHead from './ActivityHead';

export default function ScreenMoodPick({ handleWaiting }: { handleWaiting: () => void }) {
	const navigation = useNavigation();
	const nickname = useRecoilValue(userNickname);

	const [moodNum, setMoodNum] = useState<number>(0);

	const onChangMood = (value: number) => {
		setMoodNum(value);
	};

	const { connect, publish } = useTest(`/user/queue/reply`);

	const roomName = navigation.path().split('/');

	const onSend = () => {
		if (moodNum === 0) {
			alert('선택해 주세요.');
			return;
		}
		publish(`/app/moodcheckin/${roomName[2]}/submit-mood`, { mood: moodNum });
		handleWaiting();
	};

	useEffect(() => {
		connect({}, nickname || '주최자');
	}, []);

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
									onClick={() => onChangMood(i + 1)}
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
				<ElButton type="button" _onClick={onSend}>
					제출하기
				</ElButton>
			</div>
		</ElGrid>
	);
}
