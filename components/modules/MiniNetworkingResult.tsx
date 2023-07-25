'use client';

import { useRecoilValue } from 'recoil';

import { useResult } from '@/atoms/socketAtoms';
import Logo from 'public/images/activity-logo.svg';

import ElButton from '../elements/ElButton';
import ElGrid from '../elements/ElGrid';

interface MiniNetworkingResultProps {
	position: string;
	groupNum: number;
	handleClose: () => void;
}

export default function MiniNetworkingResult({ position, groupNum, handleClose }: MiniNetworkingResultProps) {
	const result = useRecoilValue(useResult);

	return (
		<ElGrid between bottomSm>
			<div>
				<Logo className="mt-[32.05%] mb-[27.88%] mx-auto" />
				{position === 'organizer' ? (
					<>
						<h2>{groupNum} 그룹 구성 완료!</h2>
						<span>참여자 화면을 확인해주세요.</span>
					</>
				) : (
					<h2>
						{result?.nickname}님은
						<br />
						{result?.group} 그룹입니다
					</h2>
				)}
			</div>
			{position === 'organizer' && (
				<div>
					<ElButton type="button" _onClick={handleClose}>
						완료하기
					</ElButton>
				</div>
			)}
		</ElGrid>
	);
}
