import { ChangeEventHandler, MouseEventHandler, ReactNode } from 'react';

import clsxm from '@/service/mergeStyle';

interface EIIconInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	icon?: ReactNode;
	placeholder?: string;
	_onChange?: ChangeEventHandler<HTMLInputElement>;
	_onDoubleClick?: MouseEventHandler<HTMLDivElement>;
	answer?: string | boolean;
	value?: string;
}

export default function EIIconInput({ icon, placeholder, _onChange, _onDoubleClick, answer, value }: EIIconInputProps) {
	const inputWrapClasses = clsxm('px-[6.67%]', 'py-[4.17%]', 'rounded', 'flex', 'items-center', 'mt-[2.22%]', 'border');
	const inputClasses = clsxm('w-full', 'text-p2', 'outline-none');

	return (
		<div className={`${inputWrapClasses} ${answer}`} onDoubleClick={_onDoubleClick}>
			{icon}
			<input className={`${inputClasses} ${answer}`} placeholder={placeholder} onChange={_onChange} value={value} />
		</div>
	);
}
