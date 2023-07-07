'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import apiClient from '@/core';
import useNotify from '@/hooks/useNotify';
import clsxm from '@/service/mergeStyle';
import PersonIcon from 'public/images/person-icon.svg';

import ElButton from '../elements/ElButton';
import ElGrid from '../elements/ElGrid';
import ElQrImage from '../elements/ElQrImage';

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

	const boldTextClasses = clsxm('mb-[1.11%]', 'font-bold', 'text-center');
	const normalTextClasses = clsxm('mb-[8.89%]', 'text-center', 'text-gray070', 'text-p2');
	const copyWrapClasses = clsxm(
		'w-fit',
		'bg-white',
		'px-[10.14%]',
		'py-[3.75%]',
		'mx-auto',
		'mb-[20.83%]',
		'rounded',
		'flex',
		'items-center',
		'border',
		'border-blue030',
	);
	const copyTextClasses = clsxm('w-full', 'text-p1', 'text-gray070');
	const copyClasses = clsxm('leading-[4.44%]', 'ml-[2.78%]', 'break-keep', 'text-p2', 'text-blue050');
	const participantWrapClasses = clsxm('flex', 'items-center', 'justify-center');
	const participantClasses = clsxm('font-bold', 'text-center', 'text-gray070', 'ml-[2.22%]');

	return (
		<ElGrid between>
			<div className="text-center mt-[4.44%]">
				<h2 className="text-h1">우리 같이 얼음땡 해요!</h2>
				<ElQrImage src={roomData?.qr_code_image_url} />
				<p className={boldTextClasses}>입장을 위한 QR코드</p>
				<p className={normalTextClasses}>QR코드를 스캔해주세요.</p>
				<div className={copyWrapClasses}>
					<p className={copyTextClasses}>{roomData?.short_url}</p>
					<button type="button" className={copyClasses} onClick={copyUrl}>
						복사
					</button>
				</div>
				<div className={participantWrapClasses}>
					<PersonIcon />
					<p className={participantClasses}>참여자 {roomData?.participant_count}명</p>
				</div>
			</div>
			<ElButton type="button" _onClick={() => {}}>
				시작하기
			</ElButton>
		</ElGrid>
	);
}
