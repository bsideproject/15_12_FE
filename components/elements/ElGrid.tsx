import clsxm from '@/service/mergeStyle';

interface ElGridProps {
	children: React.ReactNode;
}

export default function ElGrid({ children }: ElGridProps) {
	const sectionClasses = clsxm(
		'pt-[3.33%]',
		'px-[6.67%]',
		'pb-[9.72%]',
		'flex',
		'flex-col',
		'justify-between',
		'h-real-screen',
	);

	return <section className={sectionClasses}>{children}</section>;
}
