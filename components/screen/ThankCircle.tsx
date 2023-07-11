'use client';

import useMutationThankCircle from '@/queries/mutationFn/useMutationThankCircle';
import Logo from 'public/images/activity-logo.svg';

import ElButton from '../elements/ElButton';
import ElGrid from '../elements/ElGrid';
import ActivityHead from '../modules/ActivityHead';

export default function ScreenThankCircle() {
	const createThankCircle = useMutationThankCircle();

	return (
		<ElGrid between bottomSm>
			<div>
				<ActivityHead title="감사서클" />
				<Logo className="mt-[42.63%] mb-[10.58%] mx-auto" />
				<h2 className="text-h6 text-gray090 text-center mb-[5.13%]">
					초대된 참여자는 고마운 사람을
					<br />한 명 지정할 수 있어요.
				</h2>
				<p className="text-p3 text-gray090 text-center">
					랜덤으로 노출되는 순서에 따라
					<br />
					팀원들과 감사를 나눠 보세요.
				</p>
			</div>
			<ElButton type="button" _onClick={createThankCircle}>
				참여자 초대
			</ElButton>
		</ElGrid>
	);
}
