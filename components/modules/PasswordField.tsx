'use client';

import React from 'react';

import clsxm from '@/service/mergeStyle';
import Hide from 'public/images/hide-password-icon.svg';
import Show from 'public/images/show-password-icon.svg';

export default function PasswordField({
	children,
	name,
	show,
	handleInputType,
}: {
	children: React.ReactNode;
	name: string;
	show: boolean;
	handleInputType: (name: string) => void;
}) {
	const buttonClasses = clsxm('absolute', 'top-[50%]', 'translate-y-[-50%]', 'right-[7.69%]');

	return (
		<div className="relative">
			{children}
			<button type="button" className={buttonClasses} onClick={() => handleInputType(name)}>
				{show ? <Hide /> : <Show />}
			</button>
		</div>
	);
}
