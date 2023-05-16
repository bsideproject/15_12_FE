'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

const useNavigation = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const navigation = {
		push: (href: string) => router.push(href),
		back: () => router.back(),
		path: () => pathname,
		params: (query: string) => searchParams.get(query),
	};

	return navigation;
};

export default useNavigation;
