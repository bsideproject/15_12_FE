'use client';

import ElButton from '../elements/ElButton';
import ElGrid from '../elements/ElGrid';
import ActivityHead from '../modules/ActivityHead';

export default function ScreenMoodCheckin() {
	return (
		<ElGrid between bottomSm>
			<ActivityHead title="기분 체크인" />
			<ElButton type="button">시작하기</ElButton>
		</ElGrid>
	);
}
