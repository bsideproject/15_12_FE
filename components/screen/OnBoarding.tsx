'use client';

import { useRef, useState } from 'react';
import { SwiperRef } from 'swiper/react';

import useNavigation from '@/hooks/useNavigation';

import ElButton from '../elements/ElButton';
import ElGrid from '../elements/ElGrid';
import Slider from '../modules/Slider';

export default function ScreenOnBoarding() {
	const navigation = useNavigation();

	const [sliderIndex, setSliderIndex] = useState<number>(0);

	const swiperRef = useRef<SwiperRef>(null);

	const onActiveChangIndex = (activeIndex: number) => {
		setSliderIndex(activeIndex);
	};

	const onNextButton = () => {
		return sliderIndex === 2 ? navigation.push('/home') : swiperRef.current?.swiper.slideNext();
	};

	return (
		<ElGrid between>
			<div className="text-right mb-[12.82%]">
				<button type="button" className="text-p3 text-blue050" onClick={() => navigation.push('/home')}>
					Skip
				</button>
			</div>
			<Slider swiperRef={swiperRef} onActiveChangIndex={onActiveChangIndex} />
			<ElButton type="button" _onClick={onNextButton}>
				{sliderIndex === 2 ? '시작하기' : '다음'}
			</ElButton>
		</ElGrid>
	);
}
