'use client';

import { useState } from 'react';

import useNotify from '@/hooks/useNotify';
import useMutationSpeedGame from '@/queries/mutationFn/useMutationSpeedGame';
import clsxm from '@/service/mergeStyle';
import ActivityIcon01 from 'public/images/activity01-icon.svg';
import AddIcon from 'public/images/add-icon.svg';
import SaveIcon from 'public/images/save-icon.svg';

import ElButton from '../elements/ElButton';
import ElGrid from '../elements/ElGrid';
import ActivityHead from '../modules/ActivityHead';
import GameImage from '../modules/GameImage';
import SpeedGameInputs from '../modules/SpeedGameInputs';

export interface QuestionProps {
	number: number;
	question_text: string;
	answers: {
		number: number;
		answer_text: string;
		correct_answer: boolean;
	}[];
}

export default function ScreenSpeedGame() {
	const toast = useNotify();
	const createRoom = useMutationSpeedGame();
	const questionForm = (inx: number): QuestionProps => {
		return {
			number: inx,
			question_text: '',
			answers: [
				{
					number: 1,
					answer_text: '',
					correct_answer: true,
				},
				{
					number: 2,
					answer_text: '',
					correct_answer: false,
				},
				{
					number: 3,
					answer_text: '',
					correct_answer: false,
				},
				{
					number: 4,
					answer_text: '',
					correct_answer: false,
				},
			],
		};
	};
	const [questions, setQuestions] = useState<QuestionProps[]>([questionForm(1)]);
	const [total, setTotal] = useState<number>(1);

	const notlineClasses = clsxm('flex', 'w-full', 'mx-auto', 'pb-[29.17%]', 'text-p1', 'justify-center', 'items-center');
	const bottomClasses = clsxm('fixed', 'bottom-0', 'flex', 'w-full', 'max-w-[480px]', 'p-[6.67%]');

	return (
		<ElGrid pxNone>
			<div className="px-[6.67%] mb-[3.33%]">
				<ActivityHead title="스피드 게임" />
			</div>
			<div>
				<GameImage bg="bg-[#E1DEBF]" svg={<ActivityIcon01 />} />
				{questions.map((item, inx) => {
					return (
						<div key={`speedGame-question-${item.number}}`}>
							<SpeedGameInputs
								inx={inx}
								number={item.number}
								questions={questions}
								setQuestions={setQuestions}
								description="정답인 경우, 파란색 체크표시가 뜨도록 눌러주세요."
							/>
						</div>
					);
				})}
				<button
					type="button"
					className={notlineClasses}
					onClick={() => {
						setTotal(total + 1);
						setQuestions([...questions, questionForm(total + 1)]);
					}}
				>
					<AddIcon className="mr-[2.22%]" />
					<p className="text-p1 text-gray070">문제 추가하기</p>
				</button>
			</div>
			<div className={bottomClasses}>
				<ElButton type="submit" margin="mr-[3.89%]" flex="flex-1" width="w-auto" _onClick={() => createRoom(questions)}>
					만들기
				</ElButton>
				<ElButton
					type="button"
					padding="px-[5.56%] py-[3.33%]"
					flex="flex-0"
					width="w-auto"
					_onClick={() => toast.info('템플릿 기능 준비 중입니다.')}
				>
					<SaveIcon />
				</ElButton>
			</div>
		</ElGrid>
	);
}
