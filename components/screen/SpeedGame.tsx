'use client';

import GameInputs from '@/components/modules/GameInputs';
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

	const sectionClasses = clsxm('pb-[29.17%]');
	const headerClasses = clsxm('flex', 'items-center', 'justify-between', 'px-[6.67%]', 'py-[3.33%]');
	const imageClasses = clsxm('my-[22.22%]', 'mx-auto');
	const addClasses = clsxm('flex', 'mx-auto', 'text-p1', 'justify-center', 'items-center');
	const addIconClasses = clsxm('mr-[2.22%]');
	const bottomClasses = clsxm('fixed', 'bottom-0', 'flex', 'w-full', 'max-w-[480px]', 'p-[6.67%]');
	const buttonClasses = clsxm('bg-blue050', 'text-button', 'rounded');

	return (
		<section className={sectionClasses}>
			<header className={headerClasses}>
				<h2 className="text-h2">스피드 게임</h2>
				<CloseIcon />
			</header>
			<GameIcon className={imageClasses} />
			<GameInputs caption="문제" inputIcon="Q1" placeholder="문제를 입력해 주세요." />
			<GameInputs
				caption="Q1 답안"
				inputIcon={<CheckIcon />}
				placeholder="입력해 주세요."
				description="정답인 경우, 체크표시가 뜨도록 두 번 눌러주세요."
				inputData={[1, 2, 3]}
			/>
			<div className={addClasses}>
				<AddIcon className={addIconClasses} />
				<button type="button" className="text-p1 text-gray070">
					문제 추가하기
				</button>
			</div>
			<div className={bottomClasses}>
				<button
					type="button"
					className={`${buttonClasses} flex-1 mr-[3.89%] text-white`}
					onClick={() => {
						// navigation.push('/start-game');
						apiClient
							.post('/activity/speedgame')
							.then((res) => {
								console.log('res..', res);
								navigation.push('/start-game');
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
