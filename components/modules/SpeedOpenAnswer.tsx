'use client';

import clsxm from '@/service/mergeStyle';
import CheckBlueIcon from 'public/images/check-blue-icon.svg';

import EIIconInput from '../elements/EIIconInput';
import ElButton from '../elements/ElButton';
import ElGrid from '../elements/ElGrid';

interface SpeedOpenAnswerProps {
	position: string;
	handleStep: (value: string) => void;
}

export default function SpeedOpenAnswer({ position, handleStep }: SpeedOpenAnswerProps) {
	const answer = {
		answer_text: '대답 1 테스트',
		correct_user_list: ['닉네임1', '닉네임2', '닉네임3'],
	};

	const titleClasses = clsxm('text-gray090', 'text-h3', 'mb-[1.11%]');

	return (
		<ElGrid between bottomSm>
			<div>
				<p className={titleClasses}>정답은!</p>
				<EIIconInput
					icon={<CheckBlueIcon />}
					value={answer.answer_text}
					answer="border-blue050 text-blue050"
					disabled
				/>
				<p className={`${titleClasses} mt-[8.89%]`}>정답자</p>
				{answer.correct_user_list.map((item, inx) => {
					return (
						<div key={`${item}`}>
							<EIIconInput icon={<p className="text-h7">{inx}</p>} value={item} disabled />
						</div>
					);
				})}
			</div>
			{position === 'organizer' && (
				<ElButton type="button" _onClick={() => handleStep('OPENED_QUESTION')}>
					다음 문제로
				</ElButton>
			)}
		</ElGrid>
	);
}
