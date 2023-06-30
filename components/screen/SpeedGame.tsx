'use client';

import { produce } from 'immer';
import { useState } from 'react';

import apiClient from '@/core';
import useNavigation from '@/hooks/useNavigation';
import useNotify from '@/hooks/useNotify';
import clsxm from '@/service/mergeStyle';
import AddIcon from 'public/images/add-icon.svg';
import CheckIcon from 'public/images/check-icon.svg';
import CloseIcon from 'public/images/close-icon.svg';
import GameIcon from 'public/images/game-icon.svg';
import SaveIcon from 'public/images/save-icon.svg';

export default function ScreenSpeedGame() {
	const navigation = useNavigation();
	const toast = useNotify();
	const [total, setTotal] = useState<number>(1);
	const defaultQuestion = [
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

	const [questions, setQuestions] = useState(copyQuestion);

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

	const sectionClasses = clsxm('pb-[29.17%]');
	const headerClasses = clsxm('flex', 'items-center', 'justify-between', 'px-[6.67%]', 'py-[3.33%]');
	const imageClasses = clsxm('my-[22.22%]', 'mx-auto');
	const addClasses = clsxm('flex', 'mx-auto', 'text-p1', 'justify-center', 'items-center');
	const addIconClasses = clsxm('mr-[2.22%]');
	const bottomClasses = clsxm('fixed', 'bottom-0', 'flex', 'w-full', 'max-w-[480px]', 'p-[6.67%]');
	const buttonClasses = clsxm('bg-blue050', 'text-button', 'rounded');
	const containerClasses = clsxm('w-full', 'bg-white', 'px-[6.67%]', 'py-[6.39%]', 'mb-[4.44%]');
	const inputWrapClasses = clsxm(
		'px-[6.67%]',
		'py-[4.17%]',
		'rounded',
		'flex',
		'items-center',
		'mt-[2.22%]',
		'border',
		'border-blue030',
	);
	const inputIconClasses = clsxm('text-h4', 'mr-[2.78%]', 'text-gray070');
	const inputClasses = clsxm('w-full', 'text-p2', 'outline-none');

	return (
		<section className={sectionClasses}>
			<header className={headerClasses}>
				<h2 className="text-h2">스피드 게임</h2>
				<CloseIcon />
			</header>
			<GameIcon className={imageClasses} />
			{questions.map((item, inx) => {
				return (
					<div key={`speed-question-${item.number}}`}>
						<div className={containerClasses}>
							<p className="font-bold">문제</p>
							<div className={inputWrapClasses}>
								<p className={inputIconClasses}>Q{item.number}</p>
								<input
									className={inputClasses}
									placeholder="문제를 입력해 주세요."
									onChange={(e) => {
										setQuestions(
											produce((draft) => {
												draft[inx].questionText = e.target.value;
											}),
										);
									}}
									required
								/>
							</div>
						</div>
						<div className={containerClasses}>
							<p className="font-bold">Q{item.number} 답안</p>
							<div
								className={inputWrapClasses}
								onDoubleClick={() => {
									setQuestions(
										produce((draft) => {
											draft[inx].answers[0].correct_answer = true;
											draft[inx].answers[1].correct_answer = false;
											draft[inx].answers[2].correct_answer = false;
											draft[inx].answers[3].correct_answer = false;
										}),
									);
								}}
							>
								{questions[inx].answers[0].correct_answer && (
									<p className={inputIconClasses}>
										<CheckIcon />
									</p>
								)}
								<input
									className={inputClasses}
									placeholder="입력해 주세요."
									onChange={(e) => {
										setQuestions(
											produce((draft) => {
												draft[inx].answers[0].answer_text = e.target.value;
											}),
										);
									}}
									required
								/>
							</div>
							<div
								className={inputWrapClasses}
								onDoubleClick={() => {
									setQuestions(
										produce((draft) => {
											draft[inx].answers[1].correct_answer = true;
											draft[inx].answers[0].correct_answer = false;
											draft[inx].answers[2].correct_answer = false;
											draft[inx].answers[3].correct_answer = false;
										}),
									);
								}}
							>
								{questions[inx].answers[1].correct_answer && (
									<p className={inputIconClasses}>
										<CheckIcon />
									</p>
								)}
								<input
									className={inputClasses}
									placeholder="입력해 주세요."
									onChange={(e) => {
										setQuestions(
											produce((draft) => {
												draft[inx].answers[1].answer_text = e.target.value;
											}),
										);
									}}
									required
								/>
							</div>
							<div
								className={inputWrapClasses}
								onDoubleClick={() => {
									setQuestions(
										produce((draft) => {
											draft[inx].answers[2].correct_answer = true;
											draft[inx].answers[0].correct_answer = false;
											draft[inx].answers[1].correct_answer = false;
											draft[inx].answers[3].correct_answer = false;
										}),
									);
								}}
							>
								{questions[inx].answers[2].correct_answer && (
									<p className={inputIconClasses}>
										<CheckIcon />
									</p>
								)}
								<input
									className={inputClasses}
									placeholder="입력해 주세요."
									onChange={(e) => {
										produce((draft) => {
											draft[inx].answers[2].answer_text = e.target.value;
										});
									}}
									required
								/>
							</div>
							<div
								className={inputWrapClasses}
								onDoubleClick={() => {
									setQuestions(
										produce((draft) => {
											draft[inx].answers[3].correct_answer = true;
											draft[inx].answers[0].correct_answer = false;
											draft[inx].answers[1].correct_answer = false;
											draft[inx].answers[2].correct_answer = false;
										}),
									);
								}}
							>
								{questions[inx].answers[3].correct_answer && (
									<p className={inputIconClasses}>
										<CheckIcon />
									</p>
								)}
								<input
									className={inputClasses}
									placeholder="입력해 주세요."
									onChange={(e) => {
										setQuestions(
											produce((draft) => {
												draft[inx].answers[3].answer_text = e.target.value;
											}),
										);
									}}
									required
								/>
							</div>
						</div>
					</div>
				);
			})}
			<div className={addClasses}>
				<AddIcon className={addIconClasses} />
				<button
					type="button"
					className="text-p1 text-gray070"
					onClick={() => {
						setTotal(total + 1);
						copyQuestion = [...copyQuestion, newQuestion(total + 1)];
						setQuestions([...questions, newQuestion(total + 1)]);
					}}
				>
					문제 추가하기
				</button>
			</div>
			<div className={bottomClasses}>
				<button
					type="submit"
					className={`${buttonClasses} flex-1 mr-[3.89%] text-white`}
					onClick={async () => {
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
				</button>
				<button
					type="button"
					className={`${buttonClasses} flex-0 px-[5.56%] py-[3.33%]`}
					onClick={() => toast.success('템플릿이 저장되었습니다.')}
				>
					<SaveIcon />
				</button>
			</div>
		</section>
	);
}
