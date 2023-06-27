import clsxm from '@/service/mergeStyle';

interface ElButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	type: 'button' | 'submit' | 'reset';
	disabled?: boolean;
	_onClick?: () => void;
	outline?: boolean;
}

export default function ElButton({ children, type = 'button', _onClick, disabled, outline }: ElButtonProps) {
	const defaultClasses = clsxm('bg-blue050', 'text-h7', 'leading-[3.5rem]', 'rounded', 'w-full', 'disabled:bg-gray030');
	const outlineClasses = clsxm(
		'border-blue050',
		'bg-transparent',
		'text-h7',
		'leading-[3.375rem]',
		'rounded',
		'w-full',
	);

	if (outline) {
		return (
			<button type={type} className={`${outlineClasses} border text-blue050`} onClick={_onClick} disabled={disabled}>
				{children}
			</button>
		);
	}

	return (
		<button type={type} className={`${defaultClasses} text-white`} onClick={_onClick} disabled={disabled}>
			{children}
		</button>
	);
}
