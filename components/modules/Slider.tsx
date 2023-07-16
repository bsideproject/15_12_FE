'use client';

import { Pagination } from 'swiper';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

import clsxm from '@/service/mergeStyle';
import OnBoardingImg01 from 'public/images/onboarding-img01.svg';
import OnBoardingImg02 from 'public/images/onboarding-img02.svg';
import OnBoardingImg03 from 'public/images/onboarding-img03.svg';

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
			<SwiperSlide className="!flex flex-col justify-between">
				<OnBoardingImg01 className="mx-auto" />
				<p className={`${textClasses} text-gray090`}>
					얼음땡이 추천하는 6개의 <strong>상황별</strong>
					<br />
					<strong>아이스브레이킹 액티비티</strong>를 확인하세요.
				</p>
			</SwiperSlide>
			<SwiperSlide className="!flex flex-col justify-between">
				<OnBoardingImg02 className="mx-auto" />
				<p className={`${textClasses} text-gray090`}>
					<strong>한 가지를 선택</strong>해
					<br />
					액티비티를 만드세요.
				</p>
			</SwiperSlide>
			<SwiperSlide className="!flex flex-col justify-between">
				<OnBoardingImg03 className="mx-auto" />
				<p className={`${textClasses} text-gray090`}>
					<strong>QR코드를 공유</strong>해
					<br />
					다른 사람을 액티비티에 참여시키세요.
				</p>
			</SwiperSlide>
		</Swiper>
	);
}
