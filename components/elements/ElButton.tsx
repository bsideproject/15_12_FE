import clsxm from '@/service/mergeStyle';

interface ElButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	type: 'button' | 'submit' | 'reset';
	disabled?: boolean;
	_onClick?: () => void;
	outline?: boolean;
	lineHeight?: string;
	margin?: string;
	padding?: string;
	flex?: string;
	width?: string;
}

export default function ElButton({
	children,
	type = 'button',
	_onClick,
	disabled,
	outline,
	lineHeight,
	margin,
	padding,
	flex,
	width,
}: ElButtonProps) {
	const defaultClasses = clsxm('bg-blue050', 'text-h7', 'leading-[3.5rem]', 'rounded', 'disabled:bg-gray030');
	const outlineClasses = clsxm('border-blue050', 'bg-transparent', 'text-h7', 'rounded');

	if (outline) {
		return (
			<button
				type={type}
				className={`${outlineClasses} ${width || 'w-full'} ${
					lineHeight || 'leading-[3.375rem]'
				} ${margin} border text-blue050`}
				onClick={_onClick}
				disabled={disabled}
			>
				{children}
			</button>
		);
	}

	return (
		<button
			type={type}
			className={`${defaultClasses} ${width || 'w-full'} ${margin} ${padding} ${flex} text-white`}
			onClick={_onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
}
