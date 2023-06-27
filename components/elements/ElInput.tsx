import { UseFormRegisterReturn } from 'react-hook-form';

import clsxm from '@/service/mergeStyle';

interface ElInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	id: string;
	type: 'text' | 'password';
	register?: UseFormRegisterReturn;
	_onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder: string;
	margin?: string;
	padding?: string;
	disabled?: boolean;
}

export default function ElInput({ id, type, register, _onChange, placeholder, margin, disabled }: ElInputProps) {
	const inputClasses = clsxm(
		'w-full',
		'py-[4.65%]',
		'px-[7.69%]',
		'rounded',
		'border',
		'focus:border-blue050',
		'placeholder:text-gray010',
		'disabled:bg-blue010',
	);

	return (
		<label htmlFor={id} className="w-full">
			{register ? (
				<input
					className={`${inputClasses} ${margin} border-gray020 disabled:text-blueGray050 focus:!outline-none`}
					id={id}
					type={type}
					placeholder={placeholder}
					{...register}
					disabled={disabled}
					autoComplete="off"
				/>
			) : (
				<input
					className={`${inputClasses} ${margin} border-gray020 disabled:text-blueGray050 focus:!outline-none`}
					id={id}
					type={type}
					placeholder={placeholder}
					onChange={_onChange}
					disabled={disabled}
					autoComplete="off"
				/>
			)}
		</label>
	);
}
