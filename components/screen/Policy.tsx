'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { useRef, useState } from 'react';
import { Navigation } from 'swiper';
import { SwiperRef } from 'swiper/react';

import policyArr from '@/constants/policyArr';
import useNavigation from '@/hooks/useNavigation';
import Back from 'public/images/back-sm-icon.svg';

import ElGrid from '../elements/ElGrid';

export default function ScreenOnBoarding() {
	const navigation = useNavigation();
	const searchParams = useSearchParams();
	const tab = searchParams.get('tab')!;

	const [selectTab, setSelectTab] = useState<string>(tab);

	return (
		<ElGrid pxNone>
			<div className="flex items-center mb-[1.39%] px-[6.67%] py-[3.33%]">
				<button type="button" onClick={() => navigation.back()}>
					<Back />
				</button>
			</div>
			<div className="flex">
				<button
					className={`w-[50%] px-[3.33%] py-[4.44%] text-p2 border-b-2 ${
						selectTab === 'privacy' ? 'border-b-blue050' : 'border-b-gray020'
					}`}
					onClick={() => setSelectTab('privacy')}
				>
					개인정보 처리방침
				</button>
				<button
					className={`w-[50%] px-[3.33%] py-[4.44%] text-p2 border-b-2 ${
						selectTab === 'service' ? 'border-b-blue050' : 'border-b-gray020'
					}`}
					onClick={() => setSelectTab('service')}
				>
					이용약관
				</button>
			</div>
			<div className="p-[4.44%]">
				{policyArr(selectTab)?.map((item) => {
					return (
						<div
							key={`policy-${item}`}
							className={`pb-[4.44%] ${item.type === 'title' && 'text-h5'} ${item.type === 'subTitle' && 'text-h6'}
              ${item.type === 'contents' && 'text-p2 border-b-gray020 border-b-1'}
              `}
						>
							{item.text.split('\n').map((line) => {
								return (
									<span key={`split-${line}`}>
										{line}
										<br />
									</span>
								);
							})}
						</div>
					);
				})}
			</div>
		</ElGrid>
	);
}
