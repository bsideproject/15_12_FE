'use client';

import useNavigation from '@/hooks/useNavigation';
import Close from 'public/images/close-icon.svg';

export default function ActivityHead({ title }: { title: string }) {
	const navigation = useNavigation();

	return (
		<div className="flex justify-between items-center">
			<h3 className="text-h3 text-gray090">{title}</h3>
			<button type="button" onClick={() => navigation.replace('/home')}>
				<Close />
			</button>
		</div>
	);
}
