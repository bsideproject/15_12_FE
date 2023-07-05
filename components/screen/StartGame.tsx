'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import apiClient from '@/core';
import useNotify from '@/hooks/useNotify';
import clsxm from '@/service/mergeStyle';
import PersonIcon from 'public/images/person-icon.svg';

interface IRoomProps {
	participant_count: number;
	qr_code_image_url: string;
	room_code: string;
	room_name: string;
	short_url: string;
}

export default function ScreenStartGame() {
	const searchParams = useSearchParams();
	const roomCode = searchParams.get('roomCode');
	const toast = useNotify();
	const [roomData, setRoomData] = useState<IRoomProps>();

	const copyUrl = async () => {
		try {
			await navigator.clipboard.writeText(`${roomData?.short_url}`);
			toast.success('링크를 복사했습니다.');
		} catch (e) {
			toast.error('링크 복사에 실패했습니다.');
		}
	};

	useEffect(() => {
		const init = () => {
			apiClient
				.get(`${process.env.NEXT_PUBLIC_API_URL}/activity/speedgame/${roomCode}`)
				.then((res) => {
					setRoomData(res.data);
				})
				.catch((err) => {
					console.log('err..', err);
				});
		};
		init();
	}, [roomCode]);

	const headerClasses = clsxm('flex', 'items-center', 'justify-center', 'px-[6.67%]', 'py-[3.33%]');
	const imageClasses = clsxm('mt-[20.28%]', 'mb-[3.61%]', 'w-[150px]', 'h-[150px]', 'mx-auto', 'bg-gray030');
	const boldTextClasses = clsxm('mb-[1.11%]', 'font-bold', 'text-center');
	const normalTextClasses = clsxm('mb-[8.89%]', 'text-center', 'text-gray070', 'text-p2');
	const inputWrapClasses = clsxm(
		'bg-white',
		'px-[6.67%]',
		'py-[4.17%]',
		'mt-[2.22%]',
		'mb-[20.83%]',
		'mx-[13.61%]',
		'rounded',
		'flex',
		'items-center',
		'border',
		'border-blue030',
	);
	const inputClasses = clsxm('w-full', 'text-p1', 'leading-[4.44%]', 'outline-none', 'text-gray070');
	const copyClasses = clsxm('leading-[4.44%]', 'ml-[2.78%]', 'break-keep', 'text-p2', 'text-blue050');
	const participantWrapClasses = clsxm('flex', 'items-center', 'justify-center');
	const participantClasses = clsxm('font-bold', 'text-center', 'text-gray070', 'ml-[2.22%]');
	const bottomClasses = clsxm('fixed', 'bottom-0', 'flex', 'w-full', 'max-w-[480px]', 'p-[6.67%]');
	const buttonClasses = clsxm('bg-blue050', 'text-button', 'rounded', 'flex-1');

	return (
		<section>
			<header className={headerClasses}>
				<h2 className="text-h2">우리 같이 얼음땡 해요!</h2>
			</header>
			<img src={roomData?.qr_code_image_url} alt="큐알_코드" className={imageClasses} />
			<p className={boldTextClasses}>입장을 위한 QR코드</p>
			<p className={normalTextClasses}>QR코드를 스캔해주세요.</p>
			<div className={inputWrapClasses}>
				<input className={inputClasses} value={`${roomData?.short_url}`} disabled />
				<button type="button" className={copyClasses} onClick={copyUrl}>
					복사
				</button>
			</div>
			<div className={participantWrapClasses}>
				<PersonIcon />
				<p className={participantClasses}>참여자 {roomData?.participant_count}명</p>
			</div>
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