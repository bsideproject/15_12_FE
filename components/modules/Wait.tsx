'use client';

import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import userNickname from '@/atoms/userNickname';
import { useCount } from '@/atoms/useSocketAtoms';
import useNavigation from '@/hooks/useNavigation';
import useSocket from '@/hooks/useSocket';
import getUserSession from '@/service/getUserSession';
import clsxm from '@/service/mergeStyle';
import WaitImg from 'public/images/wait-img.svg';

import ElButton from '../elements/ElButton';
import ElGrid from '../elements/ElGrid';

interface WaitProps {
	position: string;
	handleStep?: () => void;
}

export default function Wait({ position, handleStep }: WaitProps) {
	const navigation = useNavigation();

	const count = useRecoilValue(useCount);

	const textClasses = clsxm('text-p2');

	return (
		<ElGrid between bottomSm>
			<div className="text-center">
				<WaitImg className="mt-[28.21%] mx-auto mb-[7.69%]" />
				<h3 className="text-h3 text-gray090">
					참여자를
					<br />
					기다리고 있어요.
				</h3>
				<p className={`${textClasses} text-gray070 mb-[20.51%]`}>참여자 {count}명</p>
				{position === 'organizer' && <p className={`${textClasses} text-gray070`}>제출자 명</p>}
			</div>
			{position === 'organizer' && (
				<ElButton type="button" _onClick={handleStep}>
					다음
				</ElButton>
			)}
		</ElGrid>
	);
}
