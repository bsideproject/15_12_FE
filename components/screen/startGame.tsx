'use client';

import useNavigation from '@/hooks/useNavigation';
import clsxm from '@/service/mergeStyle';

export default function ScreenStartGame() {
	const router = useNavigation();
	const currentUrl = router.path;

	const copyUrl = async () => {
		try {
			await navigator.clipboard.writeText(currentUrl());
			window.alert('링크를 복사했습니다.');
		} catch (e) {
			window.alert('링크 복사에 실패했습니다.');
		}
	};

	const headerClasses = clsxm('flex', 'justify-center', 'px-6', 'py-3');
	const imageClasses = clsxm('mt-[73px]', 'mb-[13px]', 'w-[150px]', 'h-[150px]', 'mx-auto', 'bg-gray030');
	const boldTextClasses = clsxm('mb-1', 'font-bold', 'text-center');
	const normalTextClasses = clsxm('mb-8', 'text-center', 'text-gray090', 'text-p2');
	const inputWrapClasses = clsxm(
		'bg-white',
		'py-[15px]',
		'px-[33px]',
		'mx-[49px]',
		'rounded-[5px]',
		'flex',
		'items-center',
		'mt-2',
		'mb-[75px]',
	);
	const inputClasses = clsxm('w-full', 'text-sm', 'leading-4', 'outline-none', 'text-gray030');
	const copyClasses = clsxm('leading-4', 'text-h6', 'ml-[10px]', 'break-keep', 'text-p2');
	const participantClasses = clsxm('font-bold', 'text-center');
	const bottomClasses = clsxm('fixed', 'bottom-0', 'flex', 'w-full', 'max-w-[480px]', 'p-6', 'bg-gray010');
	const buttonClasses = clsxm('bg-blue050', 'text-button', 'rounded', 'flex-1');

	return (
		<section>
			<header className={headerClasses}>
				<h2 className="text-h2">우리 같이 얼음땡 해요!</h2>
			</header>
			<div className={imageClasses} />
			<p className={boldTextClasses}>입장을 위한 QR코드</p>
			<p className={normalTextClasses}>QR코드를 스캔해주세요.</p>
			<div className={inputWrapClasses}>
				<input className={inputClasses} value={`https://beside1512.dev${currentUrl()}`} disabled />
				<button type="button" className={copyClasses} onClick={copyUrl}>
					복사
				</button>
			</div>
			<p className={participantClasses}>참여자 00/00</p>
			<button type="button" className={bottomClasses}>
				시작하기
			</button>
			<div className={bottomClasses}>
				<button type="button" className={`${buttonClasses} text-white`}>
					시작하기
				</button>
			</div>
		</section>
	);
}
