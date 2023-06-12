import clsxm from '@/service/mergeStyle';

interface GameInputsProps {
	caption: string;
	// eslint-disable-next-line react/require-default-props
	inputIcon?: string | JSX.Element;
	placeholder: string;
	// eslint-disable-next-line react/require-default-props
	description?: string | null;
	// eslint-disable-next-line react/require-default-props
	inputData?: Array<string | number>;
}

export default function GameInputs({ caption, inputIcon, placeholder, description, inputData }: GameInputsProps) {
	const containerClasses = clsxm('w-full', 'bg-blue030', 'px-[24px]', 'py-[23px]', 'mb-4');
	const inputWrapClasses = clsxm('bg-white', 'p-[15px]', 'rounded-[5px]', 'flex', 'items-center', 'mt-2');
	const inputIconClasses = clsxm('leading-4', 'text-h6', 'mr-[10px]');
	const inputClasses = clsxm('w-full', 'text-sm', 'leading-4', 'outline-none');
	const descriptionClasses = clsxm('px-3', 'mt-2', 'text-p2');

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
