import clsxm from '@/service/mergeStyle';

interface GameInputsProps {
	caption: string;
	inputIcon?: string | JSX.Element;
	placeholder: string;
	description?: string | null;
	inputData?: Array<string | number>;
}

export default function GameInputs({ caption, inputIcon, placeholder, description, inputData }: GameInputsProps) {
	const containerClasses = clsxm('w-full', 'bg-blue030', 'px-[6.67%]', 'py-[6.39%]', 'mb-[4.44%]');
	const inputWrapClasses = clsxm('bg-white', 'p-[4.17%]', 'rounded-[1.39%]', 'flex', 'items-center', 'mt-[2.22%]');
	const inputIconClasses = clsxm('text-h6', 'mr-[2.78%]');
	const inputClasses = clsxm('w-full', 'text-sm', 'outline-none');
	const descriptionClasses = clsxm('px-[3.33]', 'mt-[2.22%]', 'text-p2');

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
