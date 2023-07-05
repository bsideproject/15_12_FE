'use client';

import MooodCheckinImg from 'public/images/mood-checkin-img.svg';

import ElButton from '../elements/ElButton';
import ElGrid from '../elements/ElGrid';
import ActivityHead from '../modules/ActivityHead';

export default function ScreenMoodCheckin() {
	return (
		<ElGrid between bottomSm>
			<ActivityHead title="기분 체크인" />
			<div className="text-center mx-auto">
				<MooodCheckinImg className="mb-[11.22%]" />
				<p className="text-p2 text-gray090">
					참여자의
					<br />
					오늘의 기분을 알아보세요!
				</p>
			</div>
			<ElButton type="button">시작하기</ElButton>
		</ElGrid>
	);
}
