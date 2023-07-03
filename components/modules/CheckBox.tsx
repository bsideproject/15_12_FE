'use client';

import React from 'react';

interface CheckBoxProps {
	title: string;
	span?: string;
	check: number | boolean;
	onChange: (check: boolean) => void;
}

export default function CheckBox({ title, span, check, onChange }: CheckBoxProps) {
	return (
		<label htmlFor={title}>
			<div className="flex items-center select-none">
				<input
					checked={!!check}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.checked)}
					type="checkbox"
					id={title}
					name={title}
					className="appearance-none border border-blue030 rounded-full bg-transparent w-4 h-4 checked:border-green050 checked:bg-[url('/images/check-green-icon.svg')] checked:bg-center checked:bg-no-repeat"
				/>
				<p className="text-p2 text-gray090 ml-[8px]">
					{title} {span && <span className="text-gray070">{span}</span>}
				</p>
			</div>
			{!span && (
				<p className="text-c text-gray070 ml-[24px]">
					선택항목에 동의하지 않은 경우도 회원가입 및 일반적인 서비스를 이용할 수 있습니다.
				</p>
			)}
		</label>
	);
}
