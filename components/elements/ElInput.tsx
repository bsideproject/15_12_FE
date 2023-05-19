import { UseFormRegisterReturn } from 'react-hook-form';

interface ElInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	htmlFor: string;
	label: string;
	register: UseFormRegisterReturn;
}

export default function ElInput({ htmlFor, label, register }: ElInputProps) {
	return (
		<label htmlFor={htmlFor}>
			{label}
			<input id={htmlFor} type="text" {...register} />
		</label>
	);
}
