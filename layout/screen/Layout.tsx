'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Amplify } from 'aws-amplify';
import { useState } from 'react';

import useVh from '@/hooks/useVh';
import awsConfig from 'aws-exports';

Amplify.configure(awsConfig);

export default function ScreenLayout({ children, className }: { children: React.ReactNode; className: string }) {
	const [queryClient] = useState(() => new QueryClient());

	useVh();

	return (
		<QueryClientProvider client={queryClient}>
			<div className={className}>{children}</div>
		</QueryClientProvider>
	);
}
