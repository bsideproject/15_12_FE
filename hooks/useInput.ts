'use client';

import React, { useState, useCallback } from 'react';

interface UseInputState {
	[key: string]: string | number;
}

const useInput = (initialValue: UseInputState) => {
	const [value, setValue] = useState(initialValue);

	const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setValue((prev) => {
			return { ...prev, [e.target.name]: e.target.value };
		});
	}, []);

	const reset = useCallback(() => {
		setValue(initialValue);
	}, [initialValue]);

	return [value, onChange, reset] as const;
};

export default useInput;
