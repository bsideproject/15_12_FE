'use client';

import { useRef, useState } from 'react';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';

import 'swiper/css/pagination';
import 'swiper/css';

export default function ScreenOnBoarding() {
	const [sliderIndex, setSliderIndex] = useState<number>(0);

	const swiperRef = useRef<SwiperRef>(null);

	const settings = {
		ref: swiperRef,
		slidesPerView: 1,
		pagination: {
			clickable: true,
			renderBullet(index: number, className: string) {
				return `<span class="${className}">${index + 1}</span>`;
			},
		},
		modules: [Pagination],
		onActiveIndexChange: ({ activeIndex }: { activeIndex: number }) => setSliderIndex(activeIndex),
	};

	return (
		<div>
			<Swiper {...settings}>
				<SwiperSlide>Slide 1</SwiperSlide>
				<SwiperSlide>Slide 2</SwiperSlide>
				<SwiperSlide>Slide 3</SwiperSlide>
			</Swiper>
			<button type="button" onClick={() => swiperRef.current?.swiper.slideNext()}>
				다음
			</button>
		</div>
	);
}
