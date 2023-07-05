'use client';

import Close from 'public/images/close-icon.svg';

export default function ActivityHead({ title }: { title: string }) {
	return (
		<div>
			<h3>{title}</h3>
			<Close />
		</div>
	);
}
