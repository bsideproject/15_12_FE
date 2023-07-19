'use client';

import { useState } from 'react';

import clsxm from '@/service/mergeStyle';
import SpeedGameIcon from 'public/images/activity01-sm-icon.svg';
import CheckBlueCircle from 'public/images/check-bule-circle.svg';

import ElButton from '../elements/ElButton';
import ElGrid from '../elements/ElGrid';

import ActivityHead from './ActivityHead';
import GameImage from './GameImage';
import SpeedGameSelect from './SpeedGameSelect';

interface SpeedOpenQuestionProps {
	position: string;
	handleStep: (value: string) => void;
}

export default function SpeedOpenQuestion({ position, handleStep }: SpeedOpenQuestionProps) {
	const [answerSubmit, setAnswerSubmit] = useState<boolean>(false);
	const question = {
		question_id: 1,
		number: 1,
		question_text: '질문 내용 테스트',
		answers: [
			{
				answer_id: 1,
				order: 1,
				answer_text: '대답 1 테스트',
				correct_answer: false,
			},
			{
				answer_id: 2,
				order: 2,
				answer_text: '대답 2 테스트',
				correct_answer: true,
			},
			{
				answer_id: 3,
				order: 3,
				answer_text: '대답 3 테스트',
				correct_answer: false,
			},
			{
				answer_id: 4,
				order: 4,
				answer_text: '대답 4 테스트',
				correct_answer: false,
			},
		],
	};

	const flexColClasses = clsxm('flex', 'flex-col', 'flex-1');
	const centerClasses = clsxm('flex', 'flex-col', 'items-center', 'justify-center', 'flex-1');
	const totalSubmitClasses = clsxm('text-center', 'text-gray070', 'mb-[4.44%]', 'text-p2');
	const finishSubmitClasses = clsxm('mt-[3.33%]', 'mb-[0.56%]', 'text-h3');
	const headeRightClasses = clsxm(
		'bg-gray080/80',
		'rounded-[16px]',
		'h-[32px]',
		'text-p3',
		'text-gray000',
		'px-[4.44%]',
		'flex',
		'items-center',
	);

	return (
		<ElGrid between pxNone bottomSm>
			<div className={flexColClasses}>
				<div className="px-[6.67%] mb-[3.33%]">
					<ActivityHead title="스피드 게임" right={<p className={headeRightClasses}>{question.number}/0</p>} />
				</div>
				{answerSubmit ? (
					<div className={centerClasses}>
						<CheckBlueCircle />
						<p className={finishSubmitClasses}>제출 완료!</p>
						<p className="text-gray070 text-p2">곧 호스트가 정답을 발표할거에요.</p>
					</div>
				) : (
					<>
						<GameImage bg="bg-[#E1DEBF]" svg={<SpeedGameIcon />} />
						<SpeedGameSelect number={question.number} question={question} />
					</>
				)}
			</div>
			{position === 'organizer' ? (
				<div>
					<p className={totalSubmitClasses}>제출자 명</p>
					<div className="px-[6.67%]">
						<ElButton type="button" _onClick={() => handleStep('OPENED_ANSWER')}>
							정답공개
						</ElButton>
					</div>
				</div>
			) : (
				!answerSubmit && (
					<div className="px-[6.67%]">
						<ElButton
							type="button"
							_onClick={() => {
								setAnswerSubmit(true);
							}}
						>
							제출하기
						</ElButton>
					</div>
				)
			)}
		</ElGrid>
	);
}
