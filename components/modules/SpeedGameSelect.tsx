import clsxm from '@/service/mergeStyle';
import CheckBlueIcon from 'public/images/check-blue-icon.svg';
import CheckGreyIcon from 'public/images/check-grey-icon.svg';

import EIIconInput from '../elements/EIIconInput';

interface QuestionWsProps {
	question_id: number;
	number: number;
	question_text: string;
	answers: {
		answer_id: number;
		order: number;
		answer_text: string;
		correct_answer: boolean;
	}[];
}

interface SpeedGameSelectProps {
	number: number;
	question: QuestionWsProps;
}

export default function SpeedGameSelect({ number, question }: SpeedGameSelectProps) {
	const containerClasses = clsxm('w-full', 'bg-white', 'px-[6.67%]', 'py-[6.39%]', 'mb-[4.44%]');

	return (
		<>
			<div className={containerClasses}>
				<p className="font-bold">문제</p>
				<EIIconInput
					icon={<p className="text-h7">Q{number}</p>}
					value={question.question_text}
					answer="text-gray090 text-h7"
					disabled
				/>
			</div>
			<div className={containerClasses}>
				<p className="font-bold">Q{number} 답안</p>
				<EIIconInput
					icon={question.answers[0].correct_answer ? <CheckBlueIcon /> : <CheckGreyIcon />}
					value={question.answers[0].answer_text}
					answer={question.answers[0].correct_answer && 'border-blue050 text-blue050'}
					disabled
				/>
				<EIIconInput
					icon={question.answers[1].correct_answer ? <CheckBlueIcon /> : <CheckGreyIcon />}
					value={question.answers[1].answer_text}
					answer={question.answers[1].correct_answer && 'border-blue050 text-blue050'}
					disabled
				/>
				<EIIconInput
					icon={question.answers[2].correct_answer ? <CheckBlueIcon /> : <CheckGreyIcon />}
					value={question.answers[2].answer_text}
					answer={question.answers[2].correct_answer && 'border-blue050 text-blue050'}
					disabled
				/>
				<EIIconInput
					icon={question.answers[3].correct_answer ? <CheckBlueIcon /> : <CheckGreyIcon />}
					value={question.answers[3].answer_text}
					answer={question.answers[3].correct_answer && 'border-blue050 text-blue050'}
					disabled
				/>
			</div>
		</>
	);
}
