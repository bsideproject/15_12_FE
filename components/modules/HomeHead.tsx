'use Client';

import clsxm from '@/service/mergeStyle';
import Logo from 'public/images/home-logo.svg';

export default function HomeHead({ handleToggleSide }: { handleToggleSide: () => void }) {
	const headClasses = clsxm('flex', 'justify-between', 'items-center', 'mb-[8.01%]');
	const logoWrapClasses = clsxm('flex', 'justify-between', 'items-end', 'w-[87px]');
	const menuWrapClasses = clsxm('flex', 'flex-col', 'justify-between', 'w-[20px]', 'h-[12px]');
	const menuClasses = clsxm('block', 'w-full', 'bg-gray090', 'h-[2px]');

	return (
		<div className={headClasses}>
			<div className={logoWrapClasses}>
				<Logo />
				<h1 className="text-h6 text-gray070">얼음땡</h1>
			</div>
			<button type="button" className={menuWrapClasses} onClick={handleToggleSide}>
				<span className={menuClasses} />
				<span className={menuClasses} />
				<span className={menuClasses} />
			</button>
		</div>
	);
}
