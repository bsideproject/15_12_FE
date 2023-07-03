import clsxm from '@/service/mergeStyle';

interface ElGridProps {
	children: React.ReactNode;
	autoHeight?: boolean;
	between?: boolean;
	bottomSm?: boolean;
	pxNone?: boolean;
}

export default function ElGrid({ children, autoHeight, between, bottomSm, pxNone }: ElGridProps) {
	const sectionClasses = clsxm('pt-[3.33%]', 'flex', 'flex-col');

	return (
		<section
			className={`${sectionClasses} ${autoHeight ? 'h-auto' : 'h-real-screen'} ${between && 'justify-between'} ${
				bottomSm ? 'pb-[8.33%]' : 'pb-[9.72%]'
			} ${pxNone ? 'px-0' : 'px-[6.67%]'}`}
		>
			{children}
		</section>
	);
}
