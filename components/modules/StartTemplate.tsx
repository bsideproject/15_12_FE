'use client';

import { useRecoilValue } from 'recoil';

import { useCount } from '@/atoms/useSocketAtoms';
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
	payload?: any;
}

export default function StartTemplate({ data, activity, roomName, payload }: StartTemplateProps) {
	const toast = useNotify();

	const navigation = useNavigation();

	const count = useRecoilValue(useCount);

	const copyUrl = async () => {
		try {
			await navigator.clipboard.writeText(`${data?.short_url}`);
			toast.success('링크를 복사했습니다.');
		} catch (e) {
			toast.error('링크 복사에 실패했습니다.');
		}
	};

	const titleTextClasses = clsxm('text-gray090 text-center mb-[23.08%]');
	const inputWrapClasses = clsxm(
		'flex',
		'items-center',
		'justify-center',
		'border',
		'border-gray020',
		'w-[83.97%]',
		'mx-auto',
		'mb-[24.04%]',
		'bg-white',
		'rounded',
		'px-[11.70%]',
		'py-[4.33%]',
	);
	const inputClasses = clsxm('w-auto', 'outline-none', 'text-gray090', 'bg-transparent');
	const copyClasses = clsxm('ml-[10px]', 'break-keep', 'text-blue050');
	const participantWrapClasses = clsxm('flex', 'items-center', 'justify-center');
	const participantClasses = clsxm('text-center', 'text-gray070', 'ml-[2.22%]');

	const onNext = () => {
		localStorage.set('organizer');

		switch (activity) {
			case 'speedgame':
				navigation.push(`${activity}/${roomName}/progress`);
				break;
			case 'moodcheckin':
				navigation.push(`${activity}/${roomName}/progress`);
				break;
			case 'thankcircle':
				navigation.push(`${activity}/${roomName}/progress`);
				break;
			default:
				break;
		}
	};

	return (
		<ElGrid between bottomSm>
			<div>
				<h2 className={`${titleTextClasses} text-h3`}>우리 같이 얼음땡 해요!</h2>
				<div className="mb-[10.26%] text-center">
					<ElQrImage src={data?.qr_code_image_url} />
					<p className="text-h7 text-gray090">입장을 위한 QR코드</p>
					<p className="text-p3 text-gray070">QR코드를 스캔해주세요.</p>
				</div>
				<div className={inputWrapClasses}>
					<input className={`${inputClasses} text-p3`} value={`${data?.short_url}`} disabled />
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
