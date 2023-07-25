import { produce } from 'immer';
import { Dispatch, SetStateAction } from 'react';

import clsxm from '@/service/mergeStyle';
import CheckBlueIcon from 'public/images/check-blue-icon.svg';
import CheckGreyIcon from 'public/images/check-grey-icon.svg';

import EIIconInput from '../elements/EIIconInput';

import { AnswerSelectProps, QuestionPayloadProps } from './SpeedOpenQuestion';

interface SpeedGameSelectProps {
	position: string;
	question: QuestionPayloadProps;
	answerSelect: AnswerSelectProps;
	setAnswerSelect: Dispatch<SetStateAction<AnswerSelectProps>>;
}

export default function SpeedGameSelect({ position, question, answerSelect, setAnswerSelect }: SpeedGameSelectProps) {
	const containerClasses = clsxm('w-full', 'bg-white', 'px-[6.67%]', 'py-[6.39%]', 'mb-[4.44%]');

	return (
		<>
			<div className={containerClasses}>
				<p className="font-bold">문제</p>
				<EIIconInput
					icon={<p className="text-h7">Q{question.question_number}</p>}
					value={question.question_text}
					answer="text-gray090 text-h7"
					disabled
				/>
			</div>
			<div className={containerClasses}>
				<p className="font-bold">Q{question.question_number} 답안</p>
				{[0, 1, 2, 3].map((item) => {
					return (
						<EIIconInput
							key={`question-${item}`}
							icon={answerSelect.answerId === question.answers[item].answer_id ? <CheckBlueIcon /> : <CheckGreyIcon />}
							value={question.answers[item].answer_text}
							answer={answerSelect.answerId === question.answers[item].answer_id && 'border-blue050 text-blue050'}
							_onClick={() =>
								position !== 'organizer'
									? setAnswerSelect(
											produce((draft) => {
												draft.answerId = question.answers[item].answer_id;
											}),
									  )
									: {}
							}
							disabled
						/>
					);
				})}
			</div>
		</>
	);
}
