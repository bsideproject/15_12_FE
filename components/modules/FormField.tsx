'use client';

import clsxm from '@/service/mergeStyle';
import Check from 'public/images/check-sm-icon.svg';

interface FormFieldProps {
	tilte: string;
	children: React.ReactNode;
	textHelper?: string;
	iconHelper?: boolean;
	helper?: string;
	margin?: string;
}

export default function FormField({ tilte, children, textHelper, iconHelper, helper, margin }: FormFieldProps) {
	const labelClasses = clsxm('text-gray090', 'mb-[1.28%]');

	return (
		<div className={`${margin}`}>
			<h3 className={`${labelClasses} text-h7`}>{tilte}</h3>
			{children}
			<p className={`text-p3 mt-[1.28%] ${textHelper}`}>
				{iconHelper && <Check className="inline-block mr-[2.56%] [&>path]:stroke-green050" />}
				{helper}
			</p>
		</div>
	);
}
