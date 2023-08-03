'use client';

import { useRecoilValue } from 'recoil';

import { useCount, usePublish } from '@/atoms/socketAtoms';
import useNavigation from '@/hooks/useNavigation';
import useNotify from '@/hooks/useNotify';
import localStorage from '@/service/localStorage';
import clsxm from '@/service/mergeStyle';
import PersonIcon from 'public/images/person-icon.svg';

import ElButton from '../elements/ElButton';
import ElGrid from '../elements/ElGrid';
import ElQrImage from '../elements/ElQrImage';

interface StartTemplateProps {
	data: {
		participant_count: number;
		qr_code_image_url: string;
		room_code: string;
		room_name: string;
		short_url: string;
	};
	activity: string;
	roomName: string;
}

export default function StartTemplate({ data, activity, roomName }: StartTemplateProps) {
	const toast = useNotify();

	const navigation = useNavigation();

	const publish = useRecoilValue(usePublish);
	const count = useRecoilValue(useCount);

	const copyUrl = async () => {
		try {
			await navigator.clipboard.writeText(`${data?.short_url}`);
			toast.success('링크를 복사했습니다.');
		} catch (e) {
			toast.error('링크 복사에 실패했습니다.');
		}
	};

	const copyWrapClasses = clsxm(
		'flex',
		'items-center',
		'border',
		'border-gray020',
		'w-[83.97%]',
		'text-gray09',
		'mb-[16.03%]',
		'bg-white',
		'rounded',
		'px-[11.70%]',
		'py-[4.33%]',
		'justify-between',
	);
	const copyClasses = clsxm('break-keep', 'text-blue050');
	const participantWrapClasses = clsxm('flex', 'items-center', 'justify-center', 'w-full');
	const participantClasses = clsxm('text-center', 'text-gray070', 'ml-[2.22%]');

	const onNext = () => {
		localStorage.set('organizer');

		switch (activity) {
			case 'speedgame':
				publish(`/app/${activity}/${roomName}/start`);
				navigation.push(`${activity}/${roomName}/progress`);
				break;
			case 'moodcheckin':
				publish(`/app/${activity}/${roomName}/start`);
				navigation.push(`${activity}/${roomName}/progress`);
				break;
			case 'thankcircle':
				publish(`/app/${activity}/${roomName}/start`);
				navigation.push(`${activity}/${roomName}/progress`);
				break;
			case 'mininetworking':
				publish(`/app/${activity}/${roomName}/start`);
				navigation.push(`${activity}/${roomName}/progress`);
				break;
			default:
				break;
		}
	};

	return (
		<ElGrid between bottomSm>
			<div className="flex flex-col items-center">
				<h2 className="text-gray090 text-h3">우리 같이 얼음땡 해요!</h2>
				<ElQrImage src={data?.qr_code_image_url} />
				<p className="text-h7 text-gray090">입장을 위한 QR코드</p>
				<p className="text-p3 text-gray070 mb-[10.26%]">QR코드를 스캔해주세요.</p>
				<div className={copyWrapClasses}>
					{data?.short_url}
					<button type="button" className={`${copyClasses} text-h7`} onClick={copyUrl}>
						복사
					</button>
				</div>
				<div className={participantWrapClasses}>
					<PersonIcon />
					<span className={`${participantClasses} text-h7`}>참여자 {count}명</span>
				</div>
				<p className="text-center text-p3 text-gray030">참여자들이 모두 들어오면 &apos;시작&apos;을 눌러주세요</p>
			</div>
			<ElButton type="button" _onClick={onNext}>
				시작
			</ElButton>
		</ElGrid>
	);
}
