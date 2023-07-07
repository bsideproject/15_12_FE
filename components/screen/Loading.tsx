'use client';

import clsxm from '@/service/mergeStyle';
import Bg from 'public/images/loading-bg-img.svg';
import Hand from 'public/images/loading-hand-img.svg';

export default function ScreenLoading() {
	const sectionClasses = clsxm('flex justify-center items-center h-real-screen');

	return (
		<section className={sectionClasses}>
			<div className="relative">
				<Bg />
				<Hand className="absolute top-[-22%] left-[2%] animate-loading" />
			</div>
		</section>
	);
}
