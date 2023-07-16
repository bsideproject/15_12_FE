'use client';

import { useEffect, useState } from 'react';

import MoodPick from '@/components/modules/MoodPick';
import Wait from '@/components/modules/Wait';
import localStorage from '@/service/localStorage';

export default function ProgressMoodCheckin() {
	const [position, setPosition] = useState<string>('');
	const [step, setStep] = useState<string>('PICK');

	useEffect(() => {
		const userPosition = localStorage.get()!;
		setPosition(userPosition);
	}, []);

	const handleStep = (value: string) => {
		setStep(value);
	};

	return (
		<>
			{step === 'PICK' && <MoodPick handleStep={handleStep} />}
			{step === 'WAITING' && <Wait position={position} />}
		</>
	);
}
