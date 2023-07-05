'use client';

import useMutationMoodCheckin from '@/queries/mutationFn/useMutationMoodCheckin';
import MooodCheckinImg from 'public/images/mood-checkin-img.svg';

import ElButton from '../elements/ElButton';
import ElGrid from '../elements/ElGrid';
import ActivityHead from '../modules/ActivityHead';

export default function ScreenMoodCheckin() {
	const createRoom = useMutationMoodCheckin();

	return (
		<ElGrid between bottomSm>
			<ActivityHead title="기분 체크인" />
			<div className="text-center mx-auto">
				<MooodCheckinImg className="mb-[20.96%]" />
				<p className="text-p2 text-gray090">
					참여자의
					<br />
					오늘의 기분을 알아보세요!
				</p>
			</div>
			<ElButton type="button" _onClick={createRoom}>
				시작하기
			</ElButton>
		</ElGrid>
	);
}
