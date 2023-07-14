'use client';

import { ReactNode } from 'react';

import useNavigation from '@/hooks/useNavigation';
import Close from 'public/images/close-icon.svg';

export default function ActivityHead({ title, right }: { title: string; right?: ReactNode }) {
	const navigation = useNavigation();

	return (
		<div className="flex items-center justify-between">
			<h3 className="text-h3 text-gray090">{title}</h3>
			{right || (
				<button type="button" onClick={() => navigation.replace('/home')}>
					<Close />
				</button>
			)}
		</div>
	);
}
