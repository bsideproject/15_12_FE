'use client';

import { useEffect, useState } from 'react';

import Wait from '@/components/modules/Wait';
import localStorage from '@/service/localStorage';

export default function ProgressMoodCheckin() {
	const [position, setPosition] = useState<string>('');
	const [step, setStep] = useState<string>('WAITING');

	useEffect(() => {
		const userPosition = localStorage.get()!;
		setPosition(userPosition);
	}, []);

	return <Wait position={position} />;
}
