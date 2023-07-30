'use client';

import { useRecoilValue } from 'recoil';

import { useResult } from '@/atoms/socketAtoms';
import ActivityIcon04 from 'public/images/activity04-icon.svg';

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
			<div className="text-center h-full flex justify-center items-center">
				{position === 'organizer' ? (
					<div>
						<ActivityIcon04 className="mx-auto mb-[12.82%]" />
						<h2 className="text-h3 text-gray090">{groupNum} 그룹 구성 완료!</h2>
						<span className="text-p2 text-gray070">참여자 화면을 확인해주세요.</span>
					</div>
				) : (
					<h2 className="text-h3 text-gray090">
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
