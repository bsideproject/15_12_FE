'use client';

import { useState } from 'react';

import useNavigation from '@/hooks/useNavigation';
import clsxm from '@/service/mergeStyle';
import SpeedGameIcon from 'public/images/activity01-sm-icon.svg';
import CheckBlueCircle from 'public/images/check-bule-circle.svg';

import ElButton from '../elements/ElButton';
import ElGrid from '../elements/ElGrid';

import ActivityHead from './ActivityHead';
import GameImage from './GameImage';
import SpeedGameSelect from './SpeedGameSelect';

export interface AnswerSelectProps {
	questionId: number;
	answerId: number | null;
}

export interface QuestionPayloadProps {
	question_id: number;
	question_number: number;
	question_text: string;
	question_total: number;
	answers: {
		answer_id: number;
		order: number;
		answer_text: string;
		correct_answer: boolean;
	}[];
}

interface SpeedOpenQuestionProps {
	position: string;
	handleStep: () => void;
	question: QuestionPayloadProps;
	publish: (sendUrl: string, value?: any) => void;
}

export default function SpeedOpenQuestion({ position, handleStep, question, publish }: SpeedOpenQuestionProps) {
	const navigation = useNavigation();
	const roomName = navigation.path().split('/');
	const [answerSubmit, setAnswerSubmit] = useState<boolean>(false);
	const [answerSelect, setAnswerSelect] = useState<AnswerSelectProps>({
		questionId: question.question_id,
		answerId: null,
	});

	const flexColClasses = clsxm('flex', 'flex-col', 'flex-1');
	const centerClasses = clsxm('flex', 'flex-col', 'items-center', 'justify-center', 'flex-1');
	// const totalSubmitClasses = clsxm('text-center', 'text-gray070', 'mb-[4.44%]', 'text-p2');
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
					<ActivityHead
						title="스피드 게임"
						right={
							<p className={headeRightClasses}>
								{question.question_number}/{question.question_total}
							</p>
						}
					/>
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
						<SpeedGameSelect
							position={position}
							question={question}
							answerSelect={answerSelect}
							setAnswerSelect={setAnswerSelect}
						/>
					</>
				)}
			</div>
			{position === 'organizer' ? (
				<div>
					{/* <p className={totalSubmitClasses}>제출자 명</p> */}
					<div className="px-[6.67%]">
						<ElButton type="button" _onClick={handleStep}>
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
								publish(`/app/speedgame/${roomName[2]}/submit-answer`, answerSelect);
								setAnswerSubmit(true);
							}}
							disabled={answerSelect.answerId === null}
						>
							제출하기
						</ElButton>
					</div>
				)
			)}
		</ElGrid>
	);
}
