'use client';

import useMutationMiniNetworking from '@/queries/mutationFn/useMutationMiniNetworking';
import Logo from 'public/images/activity-logo.svg';

import ElButton from '../elements/ElButton';
import ElGrid from '../elements/ElGrid';
import ActivityHead from '../modules/ActivityHead';

export default function ScreenMiniNetworking() {
	const createMiniNetworking = useMutationMiniNetworking();

	return (
		<ElGrid between bottomSm>
			<div>
				<ActivityHead title="감사서클" />
				<Logo className="mt-[42.63%] mb-[10.58%] mx-auto" />
				<h2 className="text-h6 text-gray090 text-center mb-[5.13%]">
					그룹을 구성하여
					<br />
					네트워킹을 시작하세요
				</h2>
			</div>
			<ElButton type="button" _onClick={createMiniNetworking}>
				참여자 초대
			</ElButton>
		</ElGrid>
	);
}
