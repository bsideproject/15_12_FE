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
			<div>
				<ActivityHead title="기분 체크인" />
				<div className="text-center mt-[34.62%]">
					<MooodCheckinImg className="mb-[10.58%] mx-auto" />
					<p className="text-h6 text-gray090">
						참여자의
						<br />
						오늘의 기분을 알아보세요!
					</p>
				</div>
			</div>
			<ElButton type="button" _onClick={createRoom}>
				시작하기
			</ElButton>
		</ElGrid>
	);
}
