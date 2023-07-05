'use client';

import useMutationThankCircle from '@/queries/mutationFn/useMutationThankCircle';

import ElButton from '../elements/ElButton';
import ElGrid from '../elements/ElGrid';
import ActivityHead from '../modules/ActivityHead';

export default function ScreenThankCircle() {
	const createThankCircle = useMutationThankCircle();

	return (
		<ElGrid between bottomSm>
			<div>
				<ActivityHead title="감사서클" />
				<p className="text-h4 text-gray090 text-center mt-[57.69%]">
					참여자를 초대하세요.
					<br />
					순서를 랜덤으로 정해드릴게요!
				</p>
			</div>
			<ElButton type="button" _onClick={createThankCircle}>
				참여자 초대하기
			</ElButton>
		</ElGrid>
	);
}
