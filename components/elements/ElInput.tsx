import { UseFormRegisterReturn } from 'react-hook-form';

interface ElInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	id: string;
	label: string;
	register: UseFormRegisterReturn;
}

export default function ElInput({ id, label, register }: ElInputProps) {
	return (
		<label htmlFor={id}>
			{label}
			<input id={id} type="text" {...register} />
		</label>
	);
}
