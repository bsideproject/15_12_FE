'use client';

import { useSearchParams } from 'next/navigation';

import useGoogleLogin from '@/hooks/useGoogleLogin';

export default function GoogleLogin() {
	const searchParams = useSearchParams();
	const code = searchParams.get('code');
	useGoogleLogin(code);
}
