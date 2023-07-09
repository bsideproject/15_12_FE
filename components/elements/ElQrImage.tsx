'use client';

import clsxm from '@/service/mergeStyle';

interface ELQrImageProps {
	src: string | undefined;
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
	const imageClasses = clsxm('w-[125%]', 'h-[125%]', 'max-w-none');

	return (
		<div className={hiddenClasses}>
			<img src={src} alt="큐알_이미지" className={imageClasses} />
		</div>
	);
}
