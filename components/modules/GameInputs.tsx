import clsxm from '@/service/mergeStyle';

interface GameInputsProps {
	caption: string;
	inputIcon?: string | JSX.Element;
	placeholder: string;
	description?: string | null;
	inputData?: Array<string | number>;
}

export default function GameInputs({ caption, inputIcon, placeholder, description, inputData }: GameInputsProps) {
	const containerClasses = clsxm('w-full', 'bg-white', 'px-[6.67%]', 'py-[6.39%]', 'mb-[4.44%]');
	const inputWrapClasses = clsxm(
		'px-[6.67%]',
		'py-[4.17%]',
		'rounded',
		'flex',
		'items-center',
		'mt-[2.22%]',
		'border',
		'border-blue030',
	);
	const inputIconClasses = clsxm('text-h4', 'mr-[2.78%]', 'text-gray070');
	const inputClasses = clsxm('w-full', 'text-p2', 'outline-none');
	const descriptionClasses = clsxm('px-[3.33%]', 'mt-[2.22%]', 'text-p2', 'text-gray070');

	return (
		<div className={containerClasses}>
			<p className="font-bold">{caption}</p>
			<div className={inputWrapClasses}>
				{inputIcon && <p className={inputIconClasses}>{inputIcon}</p>}
				<input className={inputClasses} placeholder={placeholder} />
			</div>
			{inputData?.map((inx) => (
				<div className={inputWrapClasses} key={`input-${inx}`}>
					<input className={inputClasses} placeholder={placeholder} />
				</div>
			))}
			{description && <p className={descriptionClasses}>{description}</p>}
		</div>
	);
}
