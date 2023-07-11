'use client';

import { useEffect } from 'react';

import ResultImg from 'public/images/result-img.svg';

import ElButton from '../elements/ElButton';
import ElGrid from '../elements/ElGrid';

import ThankMixing from './ThankMixing';

interface ThankToProps {
	position: string;
	handleStep: (value: string) => void;
	handleIsMixing: () => void;
	isMixing: boolean;
}

export default function ThankTo({ position, handleStep, handleIsMixing, isMixing }: ThankToProps) {
	useEffect(() => {
		const timer = setTimeout(() => {
			handleIsMixing();
		}, 2000);

		return () => {
			clearTimeout(timer);
		};
	}, []);

	return (
		<>
			{isMixing && <ThankMixing />}
			{!isMixing && (
				<ElGrid between bottomSm>
					<div>
						<ResultImg className="mx-auto my-[9.62%]" />
						<p className="text-h3 text-gray090 text-center">
							<strong>닉네임</strong> 님이
							<br />
							<strong>닉네임</strong> 님께
							<br />
							고마운 마음을 전해요!
						</p>
					</div>
					{position === 'organizer' && (
						<div>
							<ElButton outline type="button" margin="mb-[2.56%]">
								다른 사람 확인하기
							</ElButton>
							<ElButton type="button">완료하기</ElButton>
						</div>
					)}
				</ElGrid>
			)}
		</>
	);
}
