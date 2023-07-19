import { ChangeEventHandler, MouseEventHandler, ReactNode } from 'react';

import clsxm from '@/service/mergeStyle';

interface EIIconInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	icon?: ReactNode;
	placeholder?: string;
	_onClick?: MouseEventHandler<HTMLButtonElement>;
	_onChange?: ChangeEventHandler<HTMLInputElement>;
	answer?: string | boolean;
	value?: string;
	disabled?: boolean;
}

export default function EIIconInput({
	icon,
	placeholder,
	_onChange,
	_onClick,
	answer,
	value,
	disabled,
}: EIIconInputProps) {
	const inputWrapClasses = clsxm(
		'px-[6.67%]',
		'py-[4.17%]',
		'rounded',
		'flex',
		'items-center',
		'mt-[2.22%]',
		'border',
		'bg-gray000',
	);
	const inputClasses = clsxm('text-p2', 'text-gray070');
	const inputIconClasses = clsxm('text-h7', 'text-gray070');

	return (
		<div className={`${inputWrapClasses} ${answer || 'border-gray020'}`}>
			<button
				type="button"
				onClick={_onClick}
				className={`${answer || inputIconClasses} mr-[2.78%] ${_onClick && 'cursor-pointer'}`}
			>
				{icon}
			</button>
			<input
				className={`${answer || inputClasses} outline-none w-full`}
				placeholder={placeholder}
				onChange={_onChange}
				value={value}
				disabled={disabled}
			/>
		</div>
	);
}
