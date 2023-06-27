import clsxm from '@/service/mergeStyle';

interface ElButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	type: 'button' | 'submit' | 'reset';
	_onClick: () => void;
}

export default function ElButton({ children, type = 'button', _onClick }: ElButtonProps) {
	const defaultClasses = clsxm('bg-blue050', 'text-h7', 'leading-[3.5rem]', 'rounded', 'w-full');

	return (
		<button type={type} className={`${defaultClasses} text-white`} onClick={_onClick}>
			{children}
		</button>
	);
}
