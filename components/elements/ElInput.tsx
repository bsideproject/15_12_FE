import { UseFormRegisterReturn } from 'react-hook-form';

import clsxm from '@/service/mergeStyle';

interface ElInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	id: string;
	placeholder: string;
	type: 'text' | 'password';
	register?: null | UseFormRegisterReturn;
	margin?: string;
}

const inputClasses = clsxm(
	'w-full',
	'rounded',
	'border',
	'py-[4.65%]',
	'px-[7.69%]',
	'placeholder:text-gray020',
	'focus:!outline-none',
);

export default function ElInput({ id, type, register, placeholder, margin }: ElInputProps) {
	return (
		<label htmlFor={id}>
			<input
				className={`${inputClasses} ${margin} border-blue030`}
				id={id}
				type={type}
				placeholder={placeholder}
				{...register}
			/>
		</label>
	);
}

ElInput.defaultProps = {
	register: null,
	margin: '',
};
