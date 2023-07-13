'use client';

import Image from 'next/image';

import clsxm from '@/service/mergeStyle';

interface ELQrImageProps {
	src: string;
}

export default function ElQrImage({ src }: ELQrImageProps) {
	const hiddenClasses = clsxm(
		'mt-[20.28%]',
		'mb-[3.61%]',
		'overflow-hidden',
		'w-[150px]',
		'h-[150px]',
		'mx-auto',
		'flex',
		'items-center',
		'justify-center',
	);
	const imageClasses = clsxm('bg-gray030', 'object-cover', 'mb-[2.56%]', 'mx-auto', 'w-[125%]', 'h-[125%]');

	return (
		<div className={hiddenClasses}>
			<Image src={src} alt="큐알_코드" className={imageClasses} priority width={150} height={150} />
		</div>
	);
}
