'use client';

import { useRef, useState } from 'react';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';

import 'swiper/css/pagination';
import 'swiper/css';
import ON_BOARDING_TEXT from '@/constants/onBoardingText';
import useNavigation from '@/hooks/useNavigation';
import clsxm from '@/service/mergeStyle';

export default function ScreenOnBoarding() {
	const navigation = useNavigation();

	const sectionClasses = clsxm('p-[6.67%]', 'flex', 'flex-col', 'justify-between', 'h-screen');
	const textClasses = clsxm('whitespace-pre-wrap', 'text-center', 'text-p1');
	const buttonClasses = clsxm('bg-blue050', 'text-button', 'rounded', 'w-full');

	const [sliderIndex, setSliderIndex] = useState<number>(0);

	const swiperRef = useRef<SwiperRef>(null);

	const settings = {
		ref: swiperRef,
		slidesPerView: 1,
		pagination: {
			clickable: true,
			bulletClass: 'custom_bullet',
			bulletActiveClass: 'custom-bullet-active',
			renderBullet(index: number, className: string) {
				return `<span class="${className}">${index + 1}</span>`;
			},
		},
		modules: [Pagination],
		onActiveIndexChange: ({ activeIndex }: { activeIndex: number }) => setSliderIndex(activeIndex),
	};

	const nextButton = () => {
		return sliderIndex === 2 ? navigation.push('/home') : swiperRef.current?.swiper.slideNext();
	};

	return (
		<div className={sectionClasses}>
			<div className="text-right">
				<button type="button" className="text-p2 text-gray080" onClick={() => navigation.push('/home')}>
					Skip
				</button>
			</div>
			<Swiper {...settings} className="w-full h-full mb-[11.54%]">
				{ON_BOARDING_TEXT.map((text) => {
					return (
						<SwiperSlide key={text}>
							<p className={`${textClasses} text-gray090`}>{text}</p>
						</SwiperSlide>
					);
				})}
			</Swiper>
			<button type="button" className={`${buttonClasses} text-white`} onClick={nextButton}>
				{sliderIndex === 2 ? '시작하기' : '다음'}
			</button>
		</div>
	);
}
