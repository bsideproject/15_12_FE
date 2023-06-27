'use client';

import { Pagination } from 'swiper';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

import ON_BOARDING_TEXT from '@/constants/onBoardingText';
import clsxm from '@/service/mergeStyle';
import Test from 'public/images/test-img.svg';

import 'swiper/css/pagination';
import 'swiper/css';

interface SliderProps {
	swiperRef: React.ForwardedRef<SwiperRef>;
	onActiveChangIndex: (activeIndex: number) => void;
}

export default function Slider({ swiperRef, onActiveChangIndex }: SliderProps) {
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
		onActiveIndexChange: ({ activeIndex }: { activeIndex: number }) => onActiveChangIndex(activeIndex),
	};

	const textClasses = clsxm('whitespace-pre-wrap', 'text-center', 'text-p2');

	return (
		<Swiper {...settings} className="w-full h-full mb-[7.69%]">
			{ON_BOARDING_TEXT.map((text) => {
				return (
					<SwiperSlide key={text} className="!flex flex-col justify-between">
						<Test />
						<p className={`${textClasses} text-gray090`}>{text}</p>
					</SwiperSlide>
				);
			})}
		</Swiper>
	);
}
