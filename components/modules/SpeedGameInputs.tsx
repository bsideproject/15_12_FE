import { produce } from 'immer';
import { Dispatch, SetStateAction } from 'react';

import clsxm from '@/service/mergeStyle';
import CheckBlueIcon from 'public/images/check-blue-icon.svg';
import CheckGreyIcon from 'public/images/check-grey-icon.svg';

import EIIconInput from '../elements/EIIconInput';
import { QuestionProps } from '../screen/SpeedGame';

interface SpeedGameInputsProps {
	inx: number;
	number: number;
	questions: QuestionProps[];
	setQuestions: Dispatch<SetStateAction<QuestionProps[]>>;
	description?: string;
}

export default function SpeedGameInputs({ number, inx, questions, setQuestions, description }: SpeedGameInputsProps) {
	const containerClasses = clsxm('w-full', 'bg-white', 'px-[6.67%]', 'py-[6.39%]', 'mb-[4.44%]');
	const descriptionClasses = clsxm('mt-[2.22%]', 'text-p2', 'text-gray070');

	return (
		<>
			<div className={containerClasses}>
				<p className="font-bold">문제</p>
				<EIIconInput
					placeholder="문제를 입력해 주세요."
					icon={<p className="text-h7">Q{number}</p>}
					_onChange={(e) => {
						setQuestions(
							produce((draft) => {
								draft[inx].question_text = e.target.value;
							}),
						);
					}}
				/>
			</div>
			<div className={containerClasses}>
				<p className="font-bold">Q{number} 답안</p>
				<EIIconInput
					placeholder="입력해 주세요."
					icon={questions[inx].answers[0].correct_answer ? <CheckBlueIcon /> : <CheckGreyIcon />}
					_onChange={(e) => {
						setQuestions(
							produce((draft) => {
								draft[inx].answers[0].answer_text = e.target.value;
							}),
						);
					}}
					_onClick={() => {
						setQuestions(
							produce((draft) => {
								draft[inx].answers[0].correct_answer = true;
								[1, 2, 3].map((o: number) => (draft[inx].answers[o].correct_answer = false));
							}),
						);
					}}
					answer={questions[inx].answers[0].correct_answer && 'border-blue050 text-blue050'}
				/>
				<EIIconInput
					placeholder="입력해 주세요."
					icon={questions[inx].answers[1].correct_answer ? <CheckBlueIcon /> : <CheckGreyIcon />}
					_onChange={(e) => {
						setQuestions(
							produce((draft) => {
								draft[inx].answers[1].answer_text = e.target.value;
							}),
						);
					}}
					_onClick={() => {
						setQuestions(
							produce((draft) => {
								draft[inx].answers[1].correct_answer = true;
								[0, 2, 3].map((o: number) => (draft[inx].answers[o].correct_answer = false));
							}),
						);
					}}
					answer={questions[inx].answers[1].correct_answer && 'border-blue050 text-blue050'}
				/>
				<EIIconInput
					placeholder="입력해 주세요."
					icon={questions[inx].answers[2].correct_answer ? <CheckBlueIcon /> : <CheckGreyIcon />}
					_onChange={(e) => {
						setQuestions(
							produce((draft) => {
								draft[inx].answers[2].answer_text = e.target.value;
							}),
						);
					}}
					_onClick={() => {
						setQuestions(
							produce((draft) => {
								draft[inx].answers[2].correct_answer = true;
								[0, 1, 3].map((o: number) => (draft[inx].answers[o].correct_answer = false));
							}),
						);
					}}
					answer={questions[inx].answers[2].correct_answer && 'border-blue050 text-blue050'}
				/>
				<EIIconInput
					placeholder="입력해 주세요."
					icon={questions[inx].answers[3].correct_answer ? <CheckBlueIcon /> : <CheckGreyIcon />}
					_onChange={(e) => {
						setQuestions(
							produce((draft) => {
								draft[inx].answers[3].answer_text = e.target.value;
							}),
						);
					}}
					_onClick={() => {
						setQuestions(
							produce((draft) => {
								draft[inx].answers[3].correct_answer = true;
								[0, 1, 2].map((o: number) => (draft[inx].answers[o].correct_answer = false));
							}),
						);
					}}
					answer={questions[inx].answers[3].correct_answer && 'border-blue050 text-blue050'}
				/>
				{description && <p className={descriptionClasses}>정답인 경우, 파란 체크표시가 뜨도록 눌러주세요.</p>}
			</div>
		</>
	);
}
