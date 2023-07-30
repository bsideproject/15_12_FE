'use client';

import clsxm from '@/service/mergeStyle';

interface GameImageProps {
	bg: string;
	svg: React.ReactNode;
}

export default function GameImage({ svg, bg }: GameImageProps) {
	const imageClasses = clsxm('w-[100%]', 'h-[137px]', 'flex', 'items-center', 'justify-center');

	return <div className={`${bg} ${imageClasses}`}>{svg}</div>;
}
