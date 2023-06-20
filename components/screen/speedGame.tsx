'use client';

import GameInputs from '@/components/modules/gameInputs';
import apiClient from '@/core';
import useNavigation from '@/hooks/useNavigation';
import clsxm from '@/service/mergeStyle';
import AddIcon from 'public/images/add-icon.svg';
import CheckIcon from 'public/images/check-icon.svg';
import CloseIcon from 'public/images/close-icon.svg';
import SaveIcon from 'public/images/save-icon.svg';

export default function ScreenSpeedGame() {
	const navigation = useNavigation();

	const sectionClasses = clsxm('pb-[105px]');
	const headerClasses = clsxm('flex', 'justify-between', 'px-6', 'py-3');
	const imageClasses = clsxm('my-20', 'w-[73px]', 'h-[73px]', 'mx-auto', 'bg-gray030');
	const addClasses = clsxm('flex', 'mx-auto', 'text-sm', 'leading-4');
	const addIconClasses = clsxm('w-4', 'h-4', 'mr-2');
	const bottomClasses = clsxm('fixed', 'bottom-0', 'flex', 'w-full', 'max-w-[480px]', 'p-6', 'bg-gray010');
	const buttonClasses = clsxm('bg-blue050', 'text-button', 'rounded');

	return (
		<section className={sectionClasses}>
			<header className={headerClasses}>
				<h2 className="text-h2">스피드 게임</h2>
				<CloseIcon />
			</header>
			<div className={imageClasses} />
			<GameInputs caption="문제" inputIcon="Q1" placeholder="문제를 입력해 주세요." />
			<GameInputs
				caption="Q1 답안"
				inputIcon={<CheckIcon />}
				placeholder="입력해 주세요."
				description="정답인 경우, 체크표시가 뜨도록 두 번 눌러주세요."
				inputData={[1, 2, 3]}
			/>
			<button type="button" className={addClasses}>
				<AddIcon className={addIconClasses} />
				문제 만들기
			</button>
			<div className={bottomClasses}>
				<button
					type="button"
					className={`${buttonClasses} flex-1 mr-4 text-white`}
					onClick={() => {
						navigation.push('/start-game');
						apiClient
							.get('https://api.bside1512.dev/activity/speedgame')
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
				<button type="button" className={`${buttonClasses} flex-0 px-5 py-3`}>
					<SaveIcon />
				</button>
			</div>
		</section>
	);
}
