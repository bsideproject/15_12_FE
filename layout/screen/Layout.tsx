'use client';

import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Amplify } from 'aws-amplify';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { RecoilRoot } from 'recoil';

import useVh from '@/hooks/useVh';
import awsConfig from 'aws-exports';

Amplify.configure(awsConfig);

export default function ScreenLayout({ children, className }: { children: React.ReactNode; className: string }) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						refetchOnWindowFocus: false,
						retry: false,
					},
				},
			}),
	);

	useVh();

	return (
		<QueryClientProvider client={queryClient}>
			<RecoilRoot>
				<html lang="en">
					<body>
						<div className={className}>{children}</div>
						<ToastContainer
							position="bottom-center"
							autoClose={3000}
							hideProgressBar
							newestOnTop={false}
							closeOnClick
							rtl={false}
							pauseOnFocusLoss
							draggable
							pauseOnHover
							theme="light"
							icon={false}
							closeButton={false}
							limit={1}
						/>
					</body>
				</html>
			</RecoilRoot>
		</QueryClientProvider>
	);
}
