'use client';

import useNavigation from '@/hooks/useNavigation';
import Back from 'public/images/back-sm-icon.svg';

export default function BackHead({ children }: { children: string }) {
	const navigation = useNavigation();

	return (
		<div className="flex items-center mb-[8.97%]">
			<button type="button" onClick={() => navigation.push('/login')}>
				<Back />
			</button>
			<span className="text-p1 text-gray090 ml-[2.56%]">{children}</span>
		</div>
	);
}
