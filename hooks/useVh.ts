'use client';

import { useCallback, useEffect } from 'react';

const getWindowInnerHeight = () => Number(window.innerHeight * 0.01);

const useVh = () => {
	const updateVh = useCallback(() => {
		const innerHeight = getWindowInnerHeight();

		document.documentElement.style.setProperty('--vh', `${innerHeight}px`);
	}, []);

	useEffect(() => {
		updateVh();
		window.addEventListener('resize', updateVh);

		return () => {
			window.removeEventListener('resize', updateVh);
		};
	}, [updateVh]);
};

export default useVh;
