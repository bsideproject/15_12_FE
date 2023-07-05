'use client';

import SpeedGameIcon from 'public/images/activity01-sm-icon.svg';
import { useState } from 'react';

import apiClient from '@/core';
import useNavigation from '@/hooks/useNavigation';
import useNotify from '@/hooks/useNotify';
import clsxm from '@/service/mergeStyle';
import AddIcon from 'public/images/add-icon.svg';
import SaveIcon from 'public/images/save-icon.svg';

import ElButton from '../elements/ElButton';
import ElGrid from '../elements/ElGrid';
import ActivityHead from '../modules/ActivityHead';
import SpeedGameInputs from '../modules/SpeedGameInputs';

export interface QuestionProps {
	number: number;
	questionText: string;
	answers: {
		number: number;
		answer_text: string;
		correct_answer: boolean;
	}[];
}

export default function ScreenSpeedGame() {
	const navigation = useNavigation();
	const toast = useNotify();
	const [total, setTotal] = useState<number>(1);
	const defaultQuestion: QuestionProps[] = [
		{
			number: 1,
			questionText: '-',
			answers: [
				{
					number: 1,
					answer_text: '대답 1',
					correct_answer: true,
				},
				{
					number: 2,
					answer_text: '대답 2',
					correct_answer: false,
				},
				{
					number: 3,
					answer_text: '대답 3',
					correct_answer: false,
				},
				{
					number: 4,
					answer_text: '대답 4',
					correct_answer: false,
				},
			],
		},
	];
	let copyQuestion = [...defaultQuestion];

	const [questions, setQuestions] = useState<QuestionProps[]>(copyQuestion);

	const newQuestion = (inx: number) => {
		return {
			number: inx,
			questionText: '',
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

	const imageClasses = clsxm('my-[13.33%]', 'mx-auto');
	const notlineClasses = clsxm('flex', 'w-full', 'mx-auto', 'pb-[29.17%]', 'text-p1', 'justify-center', 'items-center');
	const bottomClasses = clsxm('fixed', 'bottom-0', 'flex', 'w-full', 'max-w-[480px]', 'p-[6.67%]');

	return (
		<ElGrid pxNone>
			<div className="px-[6.67%] py-[3.33%]">
				<ActivityHead title="스피드 게임" />
			</div>
			<div className="bg-[#E1DEBF]">
				<SpeedGameIcon className={imageClasses} />
			</div>
			{questions.map((item, inx) => {
				return (
					<div key={`speedGame-question-${item.number}}`}>
						<SpeedGameInputs
							inx={inx}
							number={item.number}
							questions={questions}
							setQuestions={setQuestions}
							description="정답인 경우, 체크표시가 뜨도록 두 번 눌러주세요."
						/>
					</div>
				);
			})}
			<button
				type="button"
				className={notlineClasses}
				onClick={() => {
					setTotal(total + 1);
					copyQuestion = [...copyQuestion, newQuestion(total + 1)];
					setQuestions([...questions, newQuestion(total + 1)]);
				}}
			>
				<AddIcon className="mr-[2.22%]" />
				<p className="text-p1 text-gray070">문제 추가하기</p>
			</button>
			<div className={bottomClasses}>
				<ElButton
					type="submit"
					margin="mr-[3.89%]"
					flex="flex-1"
					width="w-auto"
					_onClick={async () => {
						await apiClient
							.post(`${process.env.NEXT_PUBLIC_API_URL}/activity/speedgame`, { questions })
							.then((res) => {
								const roomCode = res.data.room_code;
								navigation.push(`/start-game?roomCode=${roomCode}`);
							})
							.catch((err) => {
								console.log('err..', err);
							});
					}}
				>
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
