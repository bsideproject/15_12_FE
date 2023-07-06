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
	err?: boolean;
}

export default function ElInput({
	id,
	type,
	register,
	_onChange,
	placeholder,
	margin,
	padding,
	disabled,
	err,
}: ElInputProps) {
	const inputClasses = clsxm('w-full', 'rounded', 'border', 'placeholder:text-gray010', 'disabled:bg-blue010');

	return (
		<label htmlFor={id} className="w-full">
			{register ? (
				<input
					className={`${inputClasses} ${margin} ${padding || 'py-[4.65%] px-[7.69%]'} ${
						err ? 'focus:border-orange050 border-orange050' : 'focus:border-blue050 border-gray020'
					} disabled:text-blueGray050 focus:!outline-none`}
					id={id}
					type={type}
					placeholder={placeholder}
					{...register}
					disabled={disabled}
					autoComplete="off"
				/>
			) : (
				<input
					className={`${inputClasses} ${margin} ${padding || 'py-[4.65%] px-[7.69%]'} ${
						err ? 'focus:border-orange050 border-orange050' : 'focus:border-blue050 border-gray020'
					} disabled:text-blueGray050 focus:!outline-none`}
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
