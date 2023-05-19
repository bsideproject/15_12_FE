interface ElInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	name: string;
	label: string;
}

export default function ElInput({ name, label, ...rest }: ElInputProps) {
	return (
		<label htmlFor={name}>
			{label}
			<input id={name} type="text" {...rest} />
		</label>
	);
}
