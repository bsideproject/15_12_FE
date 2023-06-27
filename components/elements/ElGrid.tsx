import clsxm from '@/service/mergeStyle';

interface ElGridProps {
	children: React.ReactNode;
	between?: boolean;
	bottomSm?: boolean;
}

export default function ElGrid({ children, between, bottomSm }: ElGridProps) {
	const sectionClasses = clsxm('pt-[3.33%]', 'px-[6.67%]', 'flex', 'flex-col', 'h-real-screen');

	return (
		<section className={`${sectionClasses} ${between && 'justify-between'} ${bottomSm ? 'pb-[8.33%]' : 'pb-[9.72%]'}`}>
			{children}
		</section>
	);
}
