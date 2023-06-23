import { UseFormRegisterReturn } from 'react-hook-form';

import clsxm from '@/service/mergeStyle';

interface ElInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	id: string;
	placeholder: string;
	type: 'text' | 'password';
	register?: UseFormRegisterReturn;
	margin?: string;
	padding?: string;
}

const inputClasses = clsxm('w-full', 'rounded', 'border', 'placeholder:text-gray020', 'focus:!outline-none');

export default function ElInput({
	id,
	type,
	register,
	placeholder,
	margin,
	padding = 'py-[4.65%] px-[7.69%]',
}: ElInputProps) {
	return (
		<label htmlFor={id} className="w-full">
			<input
				className={`${inputClasses} ${margin} ${padding} border-blue030`}
				id={id}
				type={type}
				placeholder={placeholder}
				{...register}
			/>
		</label>
	);
}
