'use client';

import { useEffect } from 'react';

import ResultImg from 'public/images/result-img.svg';
import ButtonIcon from 'public/images/thank-button-icon.svg';

import ElButton from '../elements/ElButton';
import ElGrid from '../elements/ElGrid';

import ThankCircleMixing from './ThankCircleMixing';

interface ThankCircleResultProps {
	position: string;
	handleStep: () => void;
	handleClose: () => void;
	handleIsMixing: () => void;
	isMixing: boolean;
	thank: {
		thank_from: string;
		thank_to: string;
	};
}

export default function ThankCircleResult({
	position,
	handleStep,
	handleClose,
	handleIsMixing,
	isMixing,
	thank,
}: ThankCircleResultProps) {
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
			{isMixing && <ThankCircleMixing />}
			{!isMixing && (
				<ElGrid between bottomSm>
					<div>
						<ResultImg className="mx-auto my-[9.62%]" />
						<p className="text-h3 text-gray090 text-center">
							<strong>{thank?.thank_from}</strong> 님이
							<br />
							<strong>{thank?.thank_to}</strong> 님께
							<br />
							고마운 마음을 전해요!
						</p>
					</div>
					{position === 'organizer' && (
						<div>
							<ElButton outline type="button" margin="mb-[2.56%]" _onClick={handleStep}>
								<ButtonIcon className="mr-[10px] inline-block" />
								다른 사람 확인하기
							</ElButton>
							<ElButton type="button" _onClick={handleClose}>
								완료하기
							</ElButton>
						</div>
					)}
				</ElGrid>
			)}
		</>
	);
}
