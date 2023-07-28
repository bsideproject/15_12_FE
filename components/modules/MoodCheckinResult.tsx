'use client';

import { useRecoilValue } from 'recoil';

import { usePayload } from '@/atoms/socketAtoms';
import MoodResult01 from 'public/images/mood-result-01.svg';
import MoodResult02 from 'public/images/mood-result-02.svg';
import MoodResult03 from 'public/images/mood-result-03.svg';
import MoodResult04 from 'public/images/mood-result-04.svg';
import MoodResult05 from 'public/images/mood-result-05.svg';

import ElButton from '../elements/ElButton';
import ElGrid from '../elements/ElGrid';

interface MoodCheckinResultProps {
	position: string;
	handleRandom: () => void;
	handleClose: () => void;
}

export default function MoodCheckinResult({ position, handleRandom, handleClose }: MoodCheckinResultProps) {
	const payload = useRecoilValue(usePayload);

	const result = Math.round(Number(payload?.payload));
	const resultOne = Math.round(Number(payload?.payload.mood));

	return (
		<ElGrid between bottomSm>
			<div>
				{payload.type === 'OPENED_AVERAGE' && (
					<>
						<h2 className="text-h3 text-gray090 mb-[25.96%]">오늘의 평균 기분</h2>
						{result === 1 && <MoodResult01 className="mx-auto" />}
						{result === 2 && <MoodResult02 className="mx-auto" />}
						{result === 3 && <MoodResult03 className="mx-auto" />}
						{result === 4 && <MoodResult04 className="mx-auto" />}
						{result === 5 && <MoodResult05 className="mx-auto" />}
						<p className="text-p2 text-gray070 mt-[30.13%] mb-[5.13%]">참여자의 오늘의 기분을 자세히 알고싶다면?</p>
					</>
				)}
				{payload.type === 'OPENED_RANDOM' && (
					<>
						<h2 className="text-h3 text-gray090 mb-[19.55%]">{payload.payload.nickname}님의 오늘 기분</h2>
						{resultOne === 1 && <MoodResult01 className="mx-auto" />}
						{resultOne === 2 && <MoodResult02 className="mx-auto" />}
						{resultOne === 3 && <MoodResult03 className="mx-auto" />}
						{resultOne === 4 && <MoodResult04 className="mx-auto" />}
						{resultOne === 5 && <MoodResult05 className="mx-auto" />}
						<p className="text-p2 text-gray070 mb-[31.09%] text-center">
							{payload.payload.nickname}님,
							<br />
							오늘의 기분을 설명해 주세요!
						</p>
					</>
				)}
			</div>
			{position === 'organizer' && (
				<div>
					<ElButton outline type="button" margin="mb-[2.56%]" _onClick={handleRandom}>
						{payload.type === 'OPENED_AVERAGE' ? '랜덤으로 확인하기' : '다른 사람 확인하기'}
					</ElButton>
					<ElButton type="button" _onClick={handleClose}>
						완료하기
					</ElButton>
				</div>
			)}
		</ElGrid>
	);
}
