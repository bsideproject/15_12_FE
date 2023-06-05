import { UseFormRegisterReturn } from 'react-hook-form';

interface ElInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	id: string;
	label: string;
	type: 'text' | 'password';
	register: null | UseFormRegisterReturn;
}

export default function ElInput({ id, label, type, register }: ElInputProps) {
	return (
		<label htmlFor={id}>
			{label}
			<input id={id} type={type} {...register} />
		</label>
	);
}
