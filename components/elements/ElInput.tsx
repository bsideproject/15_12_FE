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
}

export default function ElInput({
	id,
	type,
	register,
	_onChange,
	placeholder,
	margin,
	padding = 'py-[4.65%] px-[7.69%]',
}: ElInputProps) {
	const inputClasses = clsxm('w-full', 'rounded', 'border', 'placeholder:text-gray020', 'focus:!outline-none');

	return (
		<label htmlFor={id} className="w-full">
			{register ? (
				<input
					className={`${inputClasses} ${margin} ${padding} border-blue030`}
					id={id}
					type={type}
					placeholder={placeholder}
					{...register}
				/>
			) : (
				<input
					className={`${inputClasses} ${margin} ${padding} border-blue030`}
					id={id}
					type={type}
					placeholder={placeholder}
					onChange={_onChange}
				/>
			)}
		</label>
	);
}
